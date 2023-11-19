# useLatestState

<div align="center"><img src="https://i.ibb.co/JQ2S7HY/Use-latest-state.png" alt="useLatestState(⚡️)" /></div>

![npm](https://img.shields.io/npm/dm/react-use-latest-state?style=for-the-badge&logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Freact-use-latest-state)

## Overview

`useLatestState` is a lightweight React package that enhances the reliability of state values within functional components. It addresses the common issue where accessing state values inside functions might yield outdated results. By leveraging `useRef` under the hood, this package ensures that you always get the latest state value.

## Motivation

In React, working with state values inside functions can sometimes lead to unexpected behavior due to closures capturing stale state. `useLatestState` aims to provide a straightforward solution to this issue, making it easier for developers to maintain the accuracy of their state values.

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

