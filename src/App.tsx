import './styles.css';
import React, { useState } from 'react';
import initialData, { TaskType, ColumnType, AppData } from './initial-data';
import Column from './column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import breakpoint from './breakpoint';

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and ${breakpoint.device.sm} {
    flex-direction: row;
  }
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 3rem;
  margin-bottom: 0;
  margin-left: 2rem;
  margin-top: 2rem;
  @media screen and ${breakpoint.device.sm} {
    font-size: 4rem;
  }
  @media screen and ${breakpoint.device.md} {
    font-size: 5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonHolder = styled.div`
  flex-direction: row;
`;

const NewTaskField = styled.input`
  background: #000;
  color: #fff;
  border: 0;
  border-bottom: 5px solid #fff;
  font-size: 2rem;
  margin-left: 2rem;
  width: 80%;
  &:focus {
    outline: 0px #fff solid;
  }
  @media screen and ${breakpoint.device.xs} {
  }
  @media screen and ${breakpoint.device.sm} {
    font-size: 2.5rem;
  }
  @media screen and ${breakpoint.device.md} {
  }
`;

const TaskButton = styled.button`
  background: #000;
  color: #fff;
  font-size: 2rem;
  border: 5px #fff solid;
  margin-left: 2rem;
  margin-top: 1rem;
  text-transform: uppercase;
  padding: 0.5rem;
  display: inline-block;
  @media screen and ${breakpoint.device.sm} {
    font-size: 2.5rem;
  }
  @media screen and ${breakpoint.device.md} {
  }
`;

export default function App() {
  const [state, setState] = useState(initialData);
  const [taskToAdd, setTaskToAdd] = useState('');

  const toggleDone = (id: string): void => {
    const newTask: TaskType = {
      ...state.tasks[id],
      done: !state.tasks[id].done,
    };
    console.log(`clicked ${newTask.id}`);
    const newState: AppData = {
      ...state,
      tasks: { ...state.tasks, [newTask.id]: newTask },
    };
    setState(newState);
  };

  const onDragEnd = (result: DropResult) => {
    document.body.style.color = '#fff';
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start: ColumnType = state.columns[source.droppableId];
    const finish: ColumnType = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds: string[] = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn: ColumnType = { ...start, taskIds: newTaskIds };

      let newState: AppData = {
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      };
      setState(newState);
      return;
    } else {
      const startTaskIds: string[] = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const startColumn: ColumnType = { ...start, taskIds: startTaskIds };

      const finishTaskIds: string[] = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const finishColumn: ColumnType = { ...finish, taskIds: finishTaskIds };

      let newState: AppData = {
        ...state,
        columns: {
          ...state.columns,
          [finishColumn.id]: finishColumn,
          [startColumn.id]: startColumn,
        },
      };
      setState(newState);
    }
  };

  const onDragStart = () => {
    document.body.style.color = '#dcdcdc';
    document.body.style.transition = 'color 0.2s ease';
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskToAdd(event.target.value);
  }

  function handleAdd(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newTasks = {
      ...state.tasks,
      [taskToAdd]: { id: taskToAdd, text: taskToAdd, done: false },
    };

    const start: ColumnType = state.columns['column-1'];
    let newTaskIds: string[] = Array.from(start.taskIds);
    newTaskIds = newTaskIds.concat(taskToAdd);

    const newColumn: ColumnType = { ...start, taskIds: newTaskIds };

    const newColumns = {
      ...state.columns,
      'column-1': newColumn,
    };

    const newState: AppData = {
      ...state,
      tasks: newTasks,
      columns: newColumns,
    };

    setState(newState);
    setTaskToAdd('');
  }
  function handleClear(): void {
    let keys: string[] = Object.keys(state.tasks);
    let clearedTaskList: { [id: string]: TaskType } = {};
    let tasksToRemove: string[] = [];
    keys.forEach((task) => {
      if (state.tasks[task].done === false) {
        clearedTaskList[task] = { ...state.tasks[task] };
      } else {
        tasksToRemove.push(task);
      }
    });

    keys = Object.keys(state.columns);
    let newColumn: {} = {};
    let newColumns: {} = {};

    keys.forEach((index) => {
      let taskIds: string[] = state.columns[index].taskIds;
      let newTaskIds: string[] = [];
      for (let i = 0; i < taskIds.length; i++) {
        let keepTask: boolean = true;
        for (let task in tasksToRemove) {
          if (taskIds[i] === tasksToRemove[task]) {
            keepTask = false;
          }
        }
        if (keepTask) {
          newTaskIds.push(taskIds[i]);
        }
      }
      newColumn = { ...state.columns[index], taskIds: newTaskIds };
      newColumns = { ...newColumns, [index]: newColumn };
    });

    let newAppData: AppData = {
      tasks: clearedTaskList,
      columns: newColumns,
      columnOrder: [...state.columnOrder],
    };

    setState(newAppData);
  }

  return (
    <div className="App">
      <Title>TO DO LIST</Title>
      <ColumnContainer>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                toggleDone={toggleDone}
              />
            );
          })}
        </DragDropContext>
      </ColumnContainer>
      <Form onSubmit={handleAdd}>
        <NewTaskField
          type="text"
          placeholder="new task"
          value={taskToAdd}
          onChange={handleChange}
        />
        <ButtonHolder>
          <TaskButton type="submit">Add</TaskButton>
          <TaskButton onClick={handleClear} type="button">
            Clear
          </TaskButton>
        </ButtonHolder>
      </Form>
    </div>
  );
}
