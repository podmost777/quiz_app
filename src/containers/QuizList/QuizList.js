import React from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends React.Component {
  state = {
    quizes: [],
    loading: true,
  };

  renderQuizes = () => {
    return this.state.quizes.map((quiz) => (
      <li key={quiz.id}>
        <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
      </li>
    ));
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "/quizes.json"
      );
      const quizes = [];
      Object.keys(response.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `Тест №${i + 1}`,
        });
      });

      this.setState({
        quizes,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
