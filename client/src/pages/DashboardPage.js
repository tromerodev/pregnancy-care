import React from "react";
import WorkRiskGraph from "../components/BarChart";
import { withRouter } from "react-router-dom";
import ScatterChartComponent from "../components/ScatterChart";
import RadarChartComponent from "../components/RadarChart";
import { branch, renderComponent } from "recompose";

import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import { gqlLodash } from "../components/gqlLodash";
import _ from "lodash";

const enhance = branch(
  ({ getWorkRisksQuery }) => getWorkRisksQuery.loading,
  renderComponent(<p>Loading</p>)
);

const getWorkRisksQuery = gql`
  {
    workRiskQuery: records {
      workRisk
    }

    menstrQuery: records {
      menstrualCycleDays
      menstrualCycleFrequency
    }

    pregType: records @_(countBy: "pregnancyType") {
      pregnancyType
    }
  }
`;

const workRisk = ({ data }) => {
  let unified = _.groupBy(
    _.flattenDeep(_.map(data.workRiskQuery, "workRisk")).map(e => {
      return { risk: e };
    }),
    "risk"
  );
  let arr = [];
  Object.keys(unified).forEach(item => {
    let obj = { name: item, value: unified[item].length };
    arr.push(obj);
  });

  return arr;
};

const menstCycle = ({ data }) => {
  return data.menstrQuery;
};

const pregType = ({ data }) => {
  let { pregType } = data;
  let arr = [];

  if (!data.loading) {
    Object.keys(pregType).forEach(item => {
      let obj = { type: item, value: pregType[item] };
      arr.push(obj);
    });
  }

  return arr;
};

const DashboardPage = ({ data }) => (
  <div className="content">
    <section class="hero is-primary is-small">
      <div class="hero-body">
        <div class="content">
          <h1 class="title">Welcome back!</h1>
        </div>
      </div>
    </section>
    <section className="info-tiles section">
      <div className="tile is-ancestor has-text-centered">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">239</p>
            <p className="subtitle">Patients</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">239</p>
            <p className="subtitle">Patients</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">239</p>
            <p className="subtitle">Patients</p>
          </article>
        </div>
      </div>
    </section>

    <div className="columns is-paddingless is-marginless">
      <div className="column is-6">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title"> Todays patients</p>
            <span className="card-header-icon">
              <span className="icon">
                <i className="fa fa-angle-down" />
              </span>
            </span>
          </header>

          <div className="card-content">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker is-primary" />
                <div class="timeline-content">
                  <p class="heading">January 2016</p>
                  <p>Timeline content - Can include any HTML element</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-icon">
                  <i class="fa fa-flag" />
                </div>
                <div class="timeline-content">
                  <p class="heading">March 2017</p>
                  <p>Timeline content - Can include any HTML element</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <span className="card-footer-item">View Agenda</span>
          </div>
        </div>
      </div>
      <div className="column is-6">
        <div className="card">
          <div className="card-content">
            <p>Principal Risks at Work for Pregnants</p>
            <WorkRiskGraph data={workRisk({ data })} />
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <p>Duration and Frequency of Period</p>
            <ScatterChartComponent data={menstCycle({ data })} />
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <p>Origin of pregnancies</p>
            <RadarChartComponent data={pregType({ data })} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default gqlLodash(getWorkRisksQuery)(withRouter(DashboardPage));
