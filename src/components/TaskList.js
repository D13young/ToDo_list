const TaskList = {
  template: `
    <div class="task-list">
      <transition-group name="fade" tag="div">
        <task-item
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @remove-task="$emit('remove-task', $event)"
          @toggle-complete="$emit('toggle-complete', $event)"
          @edit-task="$emit('edit-task', $event)"
        ></task-item>
      </transition-group>
    </div>
  `,
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
};