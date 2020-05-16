import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { RichText } from "prismic-reactjs";
import { Predicates } from "prismic-javascript";
import dayjs from "dayjs";

import Layout from "../../components/Layout";
import FlexColumn from "../../components/FlexColumn";
import TechnologyList from "../../components/TechnologyList";

import { Client } from "../../prismic-configuration";
import { TechnologyData } from "../../interfaces";
import { ProjectProps } from "../../interfaces/props";
import { usePreview } from "../../components/PreviewContext";

const projectColumnBasis = "15rem";

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
    <Layout title={projectName}>
      <style jsx>{`
        h1 {
          font-weight: 900;
        }

        .project-flex {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          /* Once column-gap is widely supported switch to it: until then, use negative margin hack */
          /* column-gap: 2rem; */
          margin-right: -3rem;
          line-height: 1.5;
        }

        .project-flex > :global(*) {
          margin-right: 3rem;
        }
      `}</style>
      {projectData && (
        <article id={`project-${uid}`}>
          <section className="project-hero">
            <h1>{projectName}</h1>
            <div>
              <em>
                {projectStart}–{projectData.ongoing ? "Present" : projectEnd}
              </em>
            </div>
          </section>
          <div className="project-flex">
            <FlexColumn
              as="section"
              className="project-details"
              columnBasis={projectColumnBasis}
              columnSpan={2}
            >
              <section className="project-description">
                <h3>Project description</h3>
                <RichText render={projectData.description} />
              </section>
            </FlexColumn>
            <TechnologyList
              as="aside"
              techsUsed={techsUsed}
              columnBasis={projectColumnBasis}
              columnSpan={1}
            />
          </div>
        </article>
      )}
    </Layout>
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
