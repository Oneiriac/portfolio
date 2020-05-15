import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { RichText } from "prismic-reactjs";
import { Predicates } from "prismic-javascript";
import dayjs from "dayjs";

import Layout from "../../components/Layout";
import { Client } from "../../prismic-configuration";
import { TechnologyData } from "../../interfaces";
import TechnologyList from "../../components/TechnologyList";

const client = Client();

type Props = {
  projectData: any;
  techsUsed: TechnologyData[];
  preview?: boolean;
};

const Project: React.FunctionComponent<Props> = (props) => {
  const { projectData, techsUsed, preview } = props;
  const projectName = projectData.name;
  const projectStart = dayjs(projectData.start_date).format("MMMM YYYY");
  const projectEnd = dayjs(projectData.end_date).format("MMMM YYYY");

  return (
    <Layout title={projectName} preview={preview}>
      <style jsx>{`
        h1 {
          font-weight: 900;
        }

        .description {
          line-height: 1.5;
        }
      `}</style>
      {projectData && (
        <>
          <h1>{projectName}</h1>
          <div>
            <em>
              {projectStart}–{projectData.ongoing ? "Present" : projectEnd}
            </em>
          </div>
          <section className="description">
            <RichText render={projectData.description} />
          </section>
          <TechnologyList techsUsed={techsUsed} />
        </>
      )}
    </Layout>
  );
};

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
    console.log(techsUsed);
  }
  if (doc?.data)
    return { props: { projectData: doc.data, techsUsed, preview } };
  else throw new Error("No document loaded");
};

export default Project;
