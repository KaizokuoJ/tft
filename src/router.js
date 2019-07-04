import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import CreateTeamComposition from './components/CreateTeamComposition'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/create-team-composition",
      name: "createTeamComposition",
      component: CreateTeamComposition
    }

  ]
});
