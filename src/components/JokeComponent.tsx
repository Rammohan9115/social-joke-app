
"use client"
import React, { useEffect, useState } from 'react';
import { JokeParams } from '~/types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';

interface JokeComponentProps {
  jokeParams: JokeParams;
}

const JokeComponent: React.FC<JokeComponentProps> = ({ jokeParams }) => {
  const [jokeData, setJokeData] = useState<any[]>([]);

  useEffect(() => {
    // Function to fetch jokes from the API
    const fetchJokes = async () => {
      const numJokes = 5; // Number of jokes to fetch
      const jokesPromises = Array.from({ length: numJokes }, async (_, index) => {
        const baseUrl = `https://v2.jokeapi.dev/joke/${jokeParams.category}`;
        const url = new URL(baseUrl);
        url.searchParams.set('type', jokeParams.type);
        url.searchParams.set('flags', JSON.stringify(jokeParams.flags));
        url.searchParams.set('lang', jokeParams.lang);

        try {
          const response = await fetch(url.toString());

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching joke:', error);
          return null;
        }
      });

      const jokes = await Promise.all(jokesPromises);
      setJokeData(jokes.filter((joke) => joke !== null));
    };

    fetchJokes();
  }, [jokeParams]);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedJokeData = reorder(jokeData, result.source.index, result.destination.index);
    setJokeData(reorderedJokeData);
  };

  const exportJokesToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(jokeData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jokes');
    XLSX.writeFile(workbook, 'jokes.xlsx');
  };

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -50 }} 
    transition={{ duration: 0.5 }}  >
      <h1 className='flex align-center justify-center font-bold text-gray-800'>Rank jokes in your preference order and download.</h1>
  
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result)} // Explicitly type the event handler
      >
        <Droppable droppableId="jokes">
          {(provided) => (
            <motion.div {...provided.droppableProps}  initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            {...provided.droppableProps}
            ref={provided.innerRef}>
              {jokeData.map((joke, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided,snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                     
                    >
                      {/*<h2>{joke.category}</h2>*/}
                      {joke.type === 'single' ? (
                        <p className='text-gray-800 font-bold border border-black rounded  hover:scale-150 m-3 p-3 bg-gradient-to-r from-indigo-200 via-purple-150 to-pink-200 ...'>{joke.joke}</p>
                      ) : (
                        <div>
                          <p>{joke.setup}</p>
                          <p>{joke.delivery}</p>
                        </div>
                      )}
                      </div>
                    
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </motion.div>
          )}
        </Droppable>
      </DragDropContext>
      <button  onClick={exportJokesToExcel} className='flex align-center justify-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-4 hover:scale-150'>
        Export Jokes as Excel
      </button>
    </motion.div>
    
  );
};

export default JokeComponent;
