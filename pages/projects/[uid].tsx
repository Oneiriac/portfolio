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
import { twoColumnContainerCss } from "../../components/TwoColumnContainer";
import ProjectLinkRow from "../../components/ProjectLinkRow";

const projectContentCss = css.resolve`
  margin-top: 1rem;
  line-height: 1.75;
`;

const heroContentCss = css.resolve`
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.75;
`;

const removeQueryFromUrl = (url: string): string => {
  const urlObject = new URL(url);
  return urlObject.origin + urlObject.pathname;
};

const projectColumnBasis = "10rem";
const twoThirdsCss = twoColumnContainerCss([2, 1], projectColumnBasis);

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
  const fullImageUrl = projectData.banner_image?.url
    ? removeQueryFromUrl(projectData.banner_image.url)
    : null;

  return (
    <>
      <style jsx>{`
        h1 {
          font-weight: 900;
          margin-top: 0;
        }

        .project-basic-info {
          font-weight: 400;
          margin-bottom: 1rem;
        }

        .project-summary {
          font-weight: 500;
        }

        .project-description {
          animation-delay: 1s;
        }

        .project-tech-list {
          display: flex;
          flex-direction: column;
          animation-delay: 1.5s;
        }

        .project-tech-list > :global(span) {
          line-height: 3;
        }

        .banner-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          animation-delay: 0.5s;
        }

        .banner-image {
          object-fit: contain;
          margin-top: 2rem;
          max-height: 20rem;
          max-width: 20rem;
          border-radius: 0.2rem;
          box-shadow: 1px 5px 2px 1px rgba(0, 0, 0, 0.3),
            2px 10px 5px 2px rgba(10, 14, 35, 0.2);
        }
      `}</style>
      {heroContentCss.styles}
      {projectContentCss.styles}
      {twoThirdsCss.styles}

      <Title title={`Projects | ${projectName}`} />
      <HeroContainer
        contentClassName={`${heroContentCss.className} ${twoThirdsCss.className}`}
        backgroundColorRgb={"var(--cool-light-color)"}
        slant="right"
      >
        <div className="project-info-container fadein-full">
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
          <ProjectLinkRow
            projectData={projectData}
            uid={uid}
            showDetailsLink={false}
          />
        </div>
        <div className="banner-container fadein-full">
          {fullImageUrl && (
            <img
              src={fullImageUrl}
              className="banner-image"
              alt={projectData?.banner_image?.alt ?? undefined}
            />
          )}
        </div>
      </HeroContainer>

      <ContentContainer as="section" className={projectContentCss.className}>
        <article id={`project-${uid}`} className={`${twoThirdsCss.className}`}>
          {projectData.description?.length > 0 && (
            <section className="project-description fadein-full">
              <h3>Project description</h3>
              <RichText render={projectData.description} />
            </section>
          )}
          {techsUsed && (
            <aside className="project-tech-list fadein-full">
              <h3>Technologies used</h3>
              <TechnologyList techsUsed={techsUsed} />
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
  let techsUsed: (TechnologyData & { id: string })[] = [];
  if (Array.isArray(techLink)) {
    const techIds: string[] = techLink.map((entry) => entry.technology.id);
    techsUsed = (
      await client.query([Predicates.any("document.id", techIds)], { ref })
    )?.results.map((entry) => ({ ...entry.data, id: entry.id }));
    // Reorder them into the original order
    techsUsed.sort(
      (techA, techB) => techIds.indexOf(techA.id) - techIds.indexOf(techB.id)
    );
  }
  if (doc?.data)
    return { props: { projectData: doc.data, uid, techsUsed, preview } };
  else throw new Error("No document loaded");
};

export default Project;
