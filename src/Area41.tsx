import React, { useState } from 'react';
import useAbortablePromise from 'use-abortable-promise';
import ErrorBoundary from './ErrorBoundary';
import { useTheme } from './Theming';

const MAX = 10;

function Area41() {
  const [count, setCount] = useState(0);
  const { darkMode } = useTheme();

  if (count > MAX) {
    throw new Error('OH MY GAD');
  }

  return (
    <div
      style={{
        background: darkMode ? 'black' : '#FFF7D3',
        padding: 40
      }}
    >
      Area 41. Here anything can happen.{' '}
      {darkMode && 'It is really dark in here.'}
      <div style={{ height: 160 }}>
        <ErrorBoundary>
          <Todo id={count + 1} />
        </ErrorBoundary>
      </div>
      <div>
        <button onClick={() => setCount(count => count + 1)}>
          {count === MAX ? 'Really...' : "Don't press this" + '.'.repeat(count)}
        </button>
      </div>
    </div>
  );
}

function Todo({ id }) {
  const [{ data, loading, error }] = useAbortablePromise(
    async signal => {
      await new Promise(resolve => setTimeout(resolve, 600));

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          signal
        }
      );

      if (Math.random() > 0.7) {
        throw new Error('Halleluja');
      }

      return response.json();
    },
    [id]
  );

  if (loading) {
    return null;
  }

  if (error) {
    throw error;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default Area41;
