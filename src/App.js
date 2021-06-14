import './App.css';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
        <InputTodo />
        <ListTodos />
    </Layout>
  );
}

export default App;
