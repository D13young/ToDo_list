const { createApp, ref, computed } = Vue;

const app = createApp({
  components: {
    TaskInput,
    TaskList
  },
  setup() {
    const savedTasks = localStorage.getItem('tasks');
    const tasks = ref(savedTasks ? JSON.parse(savedTasks) : []);

    let nextId = 1;
    if (tasks.value.length > 0) {
      nextId = Math.max(...tasks.value.map(task => task.id)) + 1;
    }
    
    const filter = ref('all');

    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    };

    const addTask = (text) => {
      tasks.value.unshift({
        id: nextId++,
        text: text,
        completed: false,
        editing: false,
        originalText: text,
        createdAt: new Date()
      });
      saveTasks();
    };

    const removeTask = (id) => {
      tasks.value = tasks.value.filter(task => task.id !== id);
      saveTasks();
    };

    const toggleTaskComplete = (id) => {
      const task = tasks.value.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
        saveTasks();
      }
    };

    const editTask = (id, newText) => {
      const task = tasks.value.find(task => task.id === id);
      if (task) {
        task.text = newText;
        task.originalText = newText;
        saveTasks();
      }
    };

    const totalTasks = computed(() => tasks.value.length);
    const completedTasks = computed(() => tasks.value.filter(t => t.completed).length);
    const pendingTasks = computed(() => totalTasks.value - completedTasks.value);
    
    const filteredTasks = computed(() => {
      switch (filter.value) {
        case 'active':
          return tasks.value.filter(task => !task.completed);
        case 'completed':
          return tasks.value.filter(task => task.completed);
        default:
          return [...tasks.value].sort((a, b) => {
            if (a.completed !== b.completed) {
              return a.completed ? 1 : -1;
            }
            return b.createdAt - a.createdAt;
          });
      }
    });
    
    return {
      tasks,
      filter,
      addTask,
      removeTask,
      toggleTaskComplete,
      editTask,
      totalTasks,
      completedTasks,
      pendingTasks,
      filteredTasks
    };
  }
});

app.component('task-input', TaskInput);
app.component('task-list', TaskList);
app.component('task-item', TaskItem);

app.mount('#app');