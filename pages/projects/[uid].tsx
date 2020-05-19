import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-reactjs";
import { Predicates } from "prismic-javascript";
import dayjs from "dayjs";
import css from "styled-jsx/css";

import TechnologyList from "../../components/TechnologyList";

import { Client } from "../../prismic-configuration";
import { TechnologyData } from "../../interfaces";
import { ProjectProps } from "../../interfaces/props";
import { usePreview } from "../../components/PreviewContext";
import ContentContainer from "../../components/ContentContainer";
import HeroContainer from "../../components/HeroContainer";
import Title from "../../components/Title";
import { MIN_GUTTER_WIDTH } from "../../components/constants";

const projectContentCss = css.resolve`
  margin-top: 1rem;
`;

const heroContentCss = css.resolve`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const projectGridCss = css.resolve`
  & {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    line-height: 1.75;
    /* Hack to get column gap with flexbox */
    margin-right: -${MIN_GUTTER_WIDTH};
    /* column-gap: 2rem; */ /* Switch to this when supported widely outside Firefox */
  }

  & > :global(*) {
    margin-right: calc(2 * ${MIN_GUTTER_WIDTH});
  }
`;

const Project: React.FunctionComponent<ProjectProps> = ({
  projectData,
  uid,
  techsUsed,
  preview,
}) => {
  usePreview(preview);
  const projectName = projectData.name;
  const projectStart = dayjs(projectData.start_date).format("MMMM YYYY");
  const projectEnd = dayjs(projectData.end_date).format("MMMM YYYY");

  return (
    <>
      <style jsx>{`
        h1 {
          font-weight: 900;
          margin-top: 0;
        }

        .project-basic-info {
          font-weight: 400;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .project-summary {
          line-height: 1.5;
          font-weight: 500;
        }

        .project-tech-list {
          display: flex;
          flex-direction: column;
        }

        .project-tech-list > :global(span) {
          line-height: 3;
        }

        .col-left {
          flex: 2 1 20rem;
        }

        .col-right {
          flex: 1 1 10rem;
        }
      `}</style>
      {heroContentCss.styles}
      {projectContentCss.styles}
      {projectGridCss.styles}

      <Title title={`Projects | ${projectName}`} />
      <HeroContainer
        contentClassName={`${heroContentCss.className} ${projectGridCss.className}`}
        backgroundColorRgb={"var(--cool-light-color)"}
        slant="right"
      >
        <div className="col-left">
          <h1>{projectName}</h1>
          <div className="project-basic-info">
            <em>
              {projectData.organisation && (
                <>
                  {projectData.organisation}
                  <br />
                </>
              )}
              {projectStart}–{projectData.ongoing ? "Present" : projectEnd}
            </em>
          </div>
          <section className="project-summary">{projectData.summary}</section>
        </div>
        <div className="col-right" />
      </HeroContainer>

      <ContentContainer as="section" className={projectContentCss.className}>
        <article id={`project-${uid}`} className={projectGridCss.className}>
          {projectData.description?.length > 0 && (
            <section className="project-description col-left">
              <h3>Project description</h3>
              <RichText render={projectData.description} />
            </section>
          )}
          {techsUsed && (
            <aside className="project-tech-list col-right">
              <h3>Technologies used</h3>
              <TechnologyList
                techsUsed={techsUsed}
                backgroundColorRgb={"var(--cool-dark-color)"}
              />
            </aside>
          )}
        </article>
      </ContentContainer>
    </>
  );
};

const client = Client();

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const queryResponse = await client.query(
    [Predicates.at("document.type", "project")],
    { orderings: "[document.start_date desc]" }
  );

  const paths = queryResponse.results.map((project) => ({
    params: { uid: project.uid as string },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const uid = params?.uid;
  const ref = previewData?.ref;
  const graphQuery = `{
    project {
      ...projectFields
      technology_link
    }
  }`;
  const queryOptions = {
    ref,
    graphQuery,
  };

  if (!uid || typeof uid !== "string") throw new Error("");
  const doc = (await client.getByUID("project", uid, queryOptions)) ?? null;
  const techLink = doc?.data?.technology_link;
  let techsUsed: TechnologyData[] = [];
  if (Array.isArray(techLink)) {
    const techIds = techLink.map((entry) => entry.technology.id);
    techsUsed = (
      await client.query([Predicates.any("document.id", techIds)], { ref })
    )?.results.map((entry) => entry.data);
  }
  if (doc?.data)
    return { props: { projectData: doc.data, uid, techsUsed, preview } };
  else throw new Error("No document loaded");
};

export default Project;
