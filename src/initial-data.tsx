export type TaskType = Readonly<{
  _id: string;
  text: string;
  done: boolean;
}>;

export type ColumnType = Readonly<{
  _id: string;
  title: string;
  taskIds: string[];
}>;

export interface AppData {
  tasks: { [_id: string]: TaskType };
  columns: { [_id: string]: ColumnType };
  columnOrder: string[];
}

const initialData: AppData = {
  tasks: {
    'task-1': { _id: 'task-1', text: 'walk the dog', done: false },
    'task-2': { _id: 'task-2', text: 'brush teeth', done: false },
  },
  columns: {
    'column-1': {
      _id: 'column-1',
      title: 'Home',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      _id: 'column-2',
      title: 'Out',
      taskIds: [],
    },
  },

  columnOrder: ['column-1', 'column-2'],
};

export default initialData;
//export { ColumnType, AppData, TaskType };
