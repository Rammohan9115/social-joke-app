import React, { useState } from 'react';
import JokeComponent from './JokeComponent';
import JokeForm from './JokeForm';
import { JokeParams } from '~/types';
import { FaLaughSquint } from 'react-icons/fa';

function JokeGenerator() {
  const [jokeParams, setJokeParams] = useState<JokeParams>({
    category: 'Programming',
    type: 'single',
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    lang: 'en',
  });

  const handleParamsChange = (params: JokeParams) => {
    // Handle the updated parameters here
    setJokeParams(params);
  };

  return (
    <div>
      <h1 className="flex align-center justify-center mt-5 text-5xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:text-gray-800 ml-2 drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,5)] ">
        Joke <FaLaughSquint className="w-30" /> Creator
      </h1>

      <div className="flex flex-col text-gray-900">
        {/* Render the JokeForm component with the callback function */}
        <div className="m-10 rounded-2xl shadow-2xl bg-gradient-to-r from-indigo-100 from-40% via-sky-100 via-50% to-emerald-10 to-90% ...">
          <JokeForm onParamsChange={handleParamsChange} />
        </div>

        {/* Render the JokeComponent component with the current joke parameters */}
        <h1 className="mt-10 align-center flex justify-center text-3xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:text-gray-800 ml-2 drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]">
          Results
        </h1>
        <div className="m-10 p-10 rounded-2xl shadow-2xl bg-gradient-to-r from-indigo-100 from-40% via-sky-100 via-50% to-emerald-10 to-90% ...">
          <div className="">
            <JokeComponent jokeParams={jokeParams} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JokeGenerator;
