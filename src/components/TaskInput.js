const TaskInput = {
  template: `
    <div class="input-container">
      <input 
        type="text" 
        class="task-input" 
        placeholder="Добавьте новую задачу..."
        v-model="newTask"
        @keyup.enter="handleAddTask"
        ref="taskInput"
      >
      <button class="add-btn" @click="handleAddTask">
        <i class="fas fa-plus"></i> Добавить
      </button>
    </div>
  `,
  setup(props, { emit }) {
    const newTask = Vue.ref('');
    const taskInput = Vue.ref(null);
    
    const handleAddTask = () => {
      if (newTask.value.trim()) {
        emit('add-task', newTask.value.trim());
        newTask.value = '';
        if (taskInput.value) {
          taskInput.value.focus();
        }
      }
    };
    
    return {
      newTask,
      handleAddTask,
      taskInput
    };
  }
};