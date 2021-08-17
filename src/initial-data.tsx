export type TaskType = Readonly<{
  id: string;
  text: string;
  done: boolean;
}>;

export type ColumnType = Readonly<{
  id: string;
  title: string;
  taskIds: string[];
}>;

export interface AppData {
  tasks: { [id: string]: TaskType };
  columns: { [id: string]: ColumnType };
  columnOrder: string[];
}

const initialData: AppData = {
  tasks: {
    'task-1': { id: 'task-1', text: 'walk the dog', done: false },
    'task-2': { id: 'task-2', text: 'brush teeth', done: false },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Home',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Out',
      taskIds: [],
    },
  },

  columnOrder: ['column-1', 'column-2'],
};

export default initialData;
//export { ColumnType, AppData, TaskType };
