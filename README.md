# useLatestState

<div align="center"><img src="https://i.ibb.co/JQ2S7HY/Use-latest-state.png" alt="useLatestState(⚡️)" /></div>

![npm](https://img.shields.io/npm/dm/react-use-latest-state?style=for-the-badge&logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Freact-use-latest-state)

## Overview

`useLatestState` is a lightweight React package that enhances the reliability of state values within functional components. It addresses the common issue where accessing state values inside functions might yield outdated results. By leveraging `useRef` under the hood, this package ensures that you always get the latest state value.

## Motivation

In React, working with state values inside functions can sometimes lead to unexpected behavior due to closures capturing stale state. `useLatestState` aims to provide a straightforward solution to this issue, making it easier for developers to maintain the accuracy of their state values.

Consider the following [code snippet](https://codesandbox.io/s/react-stale-state-within-closure-example-m4xsgr?file=/src/App.js):

```javascript
function App() {
  const factsDivRef = useRef(null);
  const [facts, setFacts] = useState([]);

  // Simple logic to auto-scroll to bottom
  // everytime a new fact is loaded
  useEffect(() => {
    factsDivRef.current.scrollTop = factsDivRef.current.scrollHeight;
  }, [facts]);

  function fetchAFact() {
    setTimeout(() => {
      fetch("https://catfact.ninja/fact").then(async (response) => {
        // `facts` in the closure
        // does not hold the latest
        // value
        console.log(facts);

        const data = await response.json();

        // Does not work well for
        // concurrent requests
        setFacts([
          ...facts,
          {
            id: Date.now(),
            fact: data.fact
          }
        ]);
      });
    }, 250); // Waits 250 ms before triggering the request, simulates a long request
  }

  return (
    <div className="card">
      <span className="title">Facts</span>
      <div ref={factsDivRef} className="facts">
        {facts.map((fact) => (
          <div key={fact.id} className="fact">
            <span>{fact.fact}</span>
          </div>
        ))}
      </div>

      {/* Clicking rapidly causes concurrent requests and does not work as expected */}
      <button onClick={fetchAFact}>Fetch a fact!</button>
    </div>
  );
}
```

In the above app, Cat facts are fetched and displayed. However, when the button is clicked rapidly, triggering concurrent requests simultaneously, the app's behavior becomes unexpected. The fact fetched by the first response is added to the facts; however, the value is only updated when other concurrent requests are resolved one by one.

This inconsistency arises because the value of facts inside the closure does not hold the latest value when the concurrent requests are processed. Such logical problems are challenging to anticipate during coding but become apparent in hindsight.

To address this issue, the `useLatestState` hook from `react-use-latest-state` is employed ([see the fixed code](https://codesandbox.io/s/react-stale-state-within-closure-example-fixed-zqlcnt?file=/src/App.js)):

```javascript
import { useLatestState } from "react-use-latest-state";

...

function App() {
  const factsDivRef = useRef(null);

  // Use `useLatestState` hook
  const [facts, setFacts] = useLatestState([]);

  // Simple logic to auto-scroll to bottom
  // everytime a new fact is loaded
  useEffect(() => {
    factsDivRef.current.scrollTop = factsDivRef.current.scrollHeight;
  }, [facts]);

  function fetchAFact() {
    setTimeout(() => {
      fetch("https://catfact.ninja/fact").then(async (response) => {
        // `facts` in the closure
        // now holds the latest value
        console.log(facts());

        const data = await response.json();

        // Works well for
        // concurrent requests
        setFacts([
          ...facts(),
          {
            id: Date.now(),
            fact: data.fact
          }
        ]);
      });
    }, 250);
  }

  return (
    <div className="card">
      <span className="title">Facts</span>
      <div ref={factsDivRef} className="facts">
        {facts().map((fact) => (
          <div key={fact.id} className="fact">
            <span>{fact.fact}</span>
          </div>
        ))}
      </div>

      <button onClick={fetchAFact}>Fetch a fact!</button>
    </div>
  );
}
```

In the fixed example, this issue is addressed by resolving the core problem. Now, clicking the button rapidly does not repeat the same unexpected behaviour.

## Installation

```bash
npm install react-use-latest-state
```

## Usage

```javascript
import { useLatestState } from "react-use-latest-state";

const YourComponent = () => {
  const [state, setState] = useLatestState(initialValue);

  // Use state as a function to get the latest value
  const handleClick = () => {
    console.log(state());
  };

  return (
    // Your component JSX
  );
};
```

## CONTRIBUTIONS

Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## CODE OF CONDUCT

Please refer to [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for more information.

