# React workshop


## target audience
* programmers (from all fields)

## Goal
* Know how to develop a react application from scratch
* know best practices in react
* build real life application with connection to backend

## prerequisite 
* coding knowledge
* online IDE (registration to codeSandBox)
* optional : install node environment

## instructor preparation 
* create FB backend
* Initial data
* CSS resources


## syllabus
### Introduction to web development
* html/CSS/JS
    * HTML - https://codesandbox.io/s/amazing-rosalind-x89il  
    * CSS - https://codesandbox.io/s/immutable-mountain-8l21i 
    * JS - https://kentcdodds.com/blog/javascript-to-know-for-react 
* The stack (from DB to Client)
* UI libs
* React
  * lib not framework (one file)
  * JSX
  * styling
  * components
  * updates 
    * props: [Test](https://stackblitz.com/edit/react-ws-hw) | [Answer](https://stackblitz.com/edit/react-ws-props)
    * state: [Test](https://stackblitz.com/edit/react-ws-pre-state) | [Answer](https://stackblitz.com/edit/react-ws-state)
  * Life cycle (test/answer)
  * hooks
    * useState
    * useEffect
### Deep dive react
* Start building WhatsApp (main screen)
  * build card component (single card)
  * build card list - explain lists/keys
  * build page comoponent (setting other components  inside) discuss composition
  * implement search component, connecting state - talk about moving state up and state handlers mobx/redux
  * split header components to different teams and share result
  * chat input and window implementation (can be test)
* Login page
  * define routes - talk about routing libs (React router, context)
  * connect to firebase
  * login page and connection to api
  * optional withAuth HOC implementation
  * registration page
* connect chat to backend (FB)
  * add chat modal
  * connect api to chat

Mock images
![Alt text](images/appMock.png)
![Alt text](images/appMock2.png)

## Authors
- [Nir Parisian](#)
- [Michael Hasin](#)