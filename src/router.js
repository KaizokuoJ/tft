import Vue from "vue";
import Router from "vue-router";
import LandingLayout from "./views/LandingLayout.vue";
import CreateTeamComposition from "./components/CreateTeamComposition";
import TeamCompositionIndex from "./components/TeamCompositionsIndex";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingLayout
    },
    {
      path: "/create-team-composition",
      name: "createTeamComposition",
      component: CreateTeamComposition
    },
    {
      path: "/team-composition-index",
      name: "teamCompositionIndex",
      component: TeamCompositionIndex
    }
  ]
});
