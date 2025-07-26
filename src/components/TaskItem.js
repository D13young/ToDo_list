const TaskItem = {
  template: `
    <div class="task-item">
      <div class="task-content">
        <input 
          type="checkbox" 
          :checked="task.completed"
          :id="'task-' + task.id"
          class="task-checkbox"
          @change="toggleCompleted"
        >
        <div class="task-text-container">
          <input
            v-if="task.editing"
            type="text"
            v-model="task.text"
            @blur="finishEditing"
            @keyup.enter="finishEditing"
            @keyup.escape="cancelEditing"
            class="edit-input"
            ref="editInput"
          >
          <label 
            v-else
            :for="'task-' + task.id" 
            :class="{ completed: task.completed }"
            class="task-text"
            @dblclick="startEditing"
          >
            {{ task.text }}
          </label>
        </div>
      </div>
      <div class="task-actions">
        <button 
          v-if="!task.editing"
          @click="startEditing" 
          class="edit-btn"
          title="Редактировать задачу"
        >
          <i class="fas fa-edit"></i>
        </button>
        <button 
          @click="$emit('remove-task', task.id)" 
          class="delete-btn"
          title="Удалить задачу"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `,
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const editInput = Vue.ref(null);
    
    const startEditing = () => {
      props.task.editing = true;
      setTimeout(() => {
        if (editInput.value) {
          editInput.value.focus();
          editInput.value.select();
        }
      }, 0);
    };
    
    const finishEditing = () => {
      if (props.task.text.trim() === '') {
        props.task.text = props.task.originalText;
      }
      props.task.editing = false;
      emit('edit-task', props.task.id, props.task.text);
    };
    
    const cancelEditing = () => {
      props.task.text = props.task.originalText;
      props.task.editing = false;
    };
    
    const toggleCompleted = () => {
      emit('toggle-complete', props.task.id);
    };
    
    return {
      startEditing,
      finishEditing,
      cancelEditing,
      editInput,
      toggleCompleted
    };
  }
};