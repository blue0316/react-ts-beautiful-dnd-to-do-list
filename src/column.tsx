import React from 'react';
import Task from './task';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { ColumnType, TaskType } from './initial-data';
import styled from 'styled-components';
import breakpoint from './breakpoint';

type ColumnProps = {
  key: string;
  column: ColumnType;
  tasks: TaskType[];
  toggleDone: (id: string) => void;
};

const ColumnContainer = styled.div`
  flex-grow: 1;
  min-height: 400px;
  width: 400px;
  min-height: inherit;
  @media screen and ${breakpoint.device.sm} {
    min-height: 400px;
  }
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-size: 2.25rem;
  margin-bottom: 0;
  margin-left: 2rem;
  margin-top: 2rem;
  @media screen and ${breakpoint.device.sm} {
    font-size: 3rem;
  }
  @media screen and ${breakpoint.device.md} {
  }
`;

const TaskList = styled.ul``;

const Column = (props: ColumnProps) => {
  return (
    <ColumnContainer>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column._id}>
        {(provided: DroppableProvided, snapshot) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map((task, index) => (
              <Task
                key={task._id}
                task={task}
                index={index}
                toggleDone={props.toggleDone}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

export default Column;
