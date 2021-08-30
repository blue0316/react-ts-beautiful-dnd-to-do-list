import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from './initial-data';
import styled from 'styled-components';
import EditableLabel from 'react-inline-editing';
import breakpoint from './breakpoint';

type TaskProps = {
  key: string;
  task: TaskType;
  index: number;
  toggleDone: (id: string) => void;
};

const TaskContainer = styled.div<{ isDragging: boolean }>`
  background-color: #000;
  font-size: 2rem;
  cursor: pointer;
  list-style: none;
  display: flex;
  flex-direction: row;
  input {
    font-size: 2rem;
    background: #000;
    color: #fff;
    display: inline;
    width: 80%;
    height: inherit;
    //transform: translatey(-2px) scale(1.03);
    border: 0;
    outline: none;
  }

  @media screen and ${breakpoint.device.sm} {
    font-size: 2.5rem;
    input {
      font-size: 2.5rem;
    }
  }
`;

const TaskButton = styled.span`
  transform: translateY(-2px);
  display: inline-block;
`;

const TaskText = styled.span<{ done: boolean }>`
  text-decoration: ${(props) => (props.done ? 'line-through' : 'inherit')};
  margin-left: 2px;
  &:focus {
  }
  div,
  label {
    display: inline;
  }
`;

const Task = (props: TaskProps) => {
  return (
    <Draggable draggableId={props.task._id} index={props.index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <li>
            <TaskButton onClick={() => props.toggleDone(props.task._id)}>
              {props.task.done
                ? String.fromCharCode(0x25a0)
                : String.fromCharCode(0x25a1)}
            </TaskButton>
            <TaskText done={props.task.done}>
              <EditableLabel text={props.task.text} />
            </TaskText>
          </li>
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;
