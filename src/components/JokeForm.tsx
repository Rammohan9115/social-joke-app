// JokeForm.tsx
"use client"
import React, { useState } from 'react';
import { JokeParams } from '~/types';
import { motion } from 'framer-motion';
// JokeForm.tsx

interface JokeFormProps {
    onParamsChange: (params: JokeParams) => void;
  }
  
  const categoryOptions = ['Programming', 'Dark', 'Pun', 'Spooky', 'Christmas']; // Define the category options
  
  const JokeForm: React.FC<JokeFormProps> = ({ onParamsChange }) => {
    const [category, setCategory] = useState<string>('Programming');
    const [type, setType] = useState<string>('single');
    const [flags, setFlags] = useState<JokeParams['flags']>({
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    });
    const [lang, setLang] = useState<string>('en');
   
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      setFlags((prevFlags) => ({
        ...prevFlags,
        [name]: checked,
      }));
    };
  
    const handleParamsChange = () => {
      const jokeParams: JokeParams = {
        category,
        type,
        flags,
        lang,
      };
      onParamsChange(jokeParams);
    };
  

  return (
    <motion.div className='flex flex-col mt-5 pb-10'
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }} 
      transition={{ duration: 0.5 }} 
    >
      <h1 className='flex align-center justify-center mt-5 text-3xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:text-gray-800 ml-2 drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]'> Joke Parameters</h1>
      <div className='flex flex-grow flex-row align-center justify-center mt-8 hover:scale-150 transition'>
            <h1 className='mt-4'>Category:</h1>
                <label className='mb-2 text-l font-medium text-gray-900 p-2'>
                    <select className='text-gray-900 text-l rounded-lg block w-full p-2.5 bg-gray-200 bg-opacity-50 bg-blur-20' value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                </label>
      </div>
      <br />
      <div className='flex flex-row align-center justify-center hover:scale-150 transition scroll-smooth'>
      <h1 className='-mt-2'>Type:</h1>
      <label className='-mt-6 p-2 block mb-2 text-l font-medium text-gray-900'>
        
        <select className=' text-gray-900 text-l rounded-lg block w-full p-2.5 bg-gray-200 bg-opacity-50 bg-blur-20 ' value={type} onChange={(e) => setType(e.target.value)}>
          <option value="single">Single</option>
          <option value="twopart">Two Part</option>
        </select>
      </label>
      </div>
      <br />
      <div className='-mt-6 flex flex-row p-2 m-1 align-center justify-center transition'>
        <div className='flex md:flex-row flex-col p-2 mb-1'> <h1 className='mb-2 mt-2'></h1>
        <label className='ml-2 p-4  text-sm font-medium text-gray-900 dark:text-gray-900 hover:scale-150 transition'>
          NSFW: 
          <input className='m-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="nsfw" checked={flags.nsfw} onChange={handleCheckboxChange} />
        </label>
        <label className='ml-2 p-4  text-sm font-medium text-gray-900 dark:text-gray-900 hover:scale-150 transition'>
          Religious
          <input className='m-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="religious" checked={flags.religious} onChange={handleCheckboxChange} />
        </label>
        <label className='ml-2 p-4 text-sm font-medium text-gray-900 dark:text-gray-900 hover:scale-150 transition'>
          Political
          <input className='m-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="political" checked={flags.political} onChange={handleCheckboxChange} />
        </label>
        <label className='ml-2 p-4 text-sm font-medium text-gray-900 dark:text-gray-900 hover:scale-150 transition' >
          Racist
          <input className='m-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'  type="checkbox" name="racist" checked={flags.racist} onChange={handleCheckboxChange} />
        </label>
        <label className='ml-2 p-4  text-sm font-medium text-gray-900 dark:text-gray-900 hover:scale-150 transition'>
          Sexist
          <input className='m-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="sexist" checked={flags.sexist} onChange={handleCheckboxChange} />
        </label>
        <label className='ml-2 p-4 text-sm font-medium text-gray-900 dark:text-gray-900 hover:scale-150 transition'>
          Explicit
          <input className='m-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="explicit" checked={flags.explicit} onChange={handleCheckboxChange} />
        </label>
        </div>
      </div>
      <br />
      <div className='flex flex-row p-2 mb-1 align-center justify-center -mt-5'>
      <h1 className='-mt-2 mb-2'>Language:</h1>
      <label className='-mt-6 p-2 m-1 hover:scale-150 transition'>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-900 transition' type="text" value={lang} onChange={(e) => setLang(e.target.value)} />
      </label>
      </div>
      <br />
      <div className='flex flex-row p-2 mb-1 align-center justify-center -mt-5'>
      <button className='align-center justify-center mt-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-3 rounded-full hover:scale-150 transition' onClick={handleParamsChange}>Apply Parameters</button>
      </div>
     
    </motion.div>
  );
};

export default JokeForm;
