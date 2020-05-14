import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Predicates } from "prismic-javascript";

import Layout from "../../components/Layout";
import { Client } from "../../prismic-configuration";
import { TechnologyData } from "../../interfaces";

const client = Client();

type Props = {
  projectData: any;
  techsUsed: TechnologyData[];
  preview?: boolean;
};

const Project: React.FunctionComponent<Props> = (props) => {
  const { projectData, techsUsed, preview } = props;
  const projectName = projectData.name;
  const projectStart = projectData.start_date;
  const projectEnd = projectData.end_date;

  return (
    <Layout title={projectName} preview={preview}>
      <style jsx>{`
        h1 {
          font-weight: 900;
        }
        .techs-used {
          display: flex;
          flex-direction: column;
        }

        .techs-used span {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      `}</style>
      {projectData && (
        <>
          <h1>{projectName}</h1>
          <div>
            <em>
              {projectStart} to {projectEnd}
            </em>
          </div>
          <section className="techs-used">
            <h3>Technologies used</h3>
            {techsUsed.map((tech) => (
              <span key={tech.name}>
                {tech.name}
                <img
                  width={24}
                  height={24}
                  src={tech.icon.url}
                  alt={tech.icon.alt ?? undefined}
                />
              </span>
            ))}
          </section>
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
      await client.query([Predicates.any("document.id", techIds)], {})
    )?.results.map((entry) => entry.data);
    console.log(techsUsed[0]);
  }
  if (doc?.data)
    return { props: { projectData: doc.data, techsUsed, preview } };
  else throw new Error("No document loaded");
};

export default Project;
