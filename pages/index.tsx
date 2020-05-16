import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import { Predicates } from "prismic-javascript";
import { AugmentedProjectData, TechnologyData } from "../interfaces";
import { Client } from "../prismic-configuration";
import ProjectCard from "../components/ProjectCard";

type ProjectsIndex = AugmentedProjectData[];

interface Props {
  projects?: ProjectsIndex;
  preview?: boolean;
}

const IndexPage: React.FunctionComponent<Props> = ({ projects, preview }) => (
  <Layout title="Home" preview={preview}>
    <style jsx>{`
      .project-card-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        gap: 2rem;
      }
    `}</style>
    <h1>Hey there—I'm Damon 👋</h1>
    <p>
      Software engineer,
      <br />
      Linguistics student
    </p>
    {projects && (
      <section className="project-list">
        <h2>Projects</h2>
        <div className="project-card-container">
          {projects.map((project) => (
            <ProjectCard
              key={project.uid}
              projectData={project}
              uid={project.uid}
              techsUsed={project.techsUsed}
            />
          ))}
        </div>
      </section>
    )}
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

const client = Client();

/**
 * Fetch the list of projects and their data so that they can be displayed on the index page.
 */
export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  const ref = previewData?.ref;

  const docs: any[] =
    (
      await client.query(
        [Predicates.any("document.type", ["project", "technology"])],
        { ref }
      )
    )?.results ?? [];

  const technologies: { [id: string]: TechnologyData } = docs.reduce(
    (result, doc) => {
      if (doc.type === "technology") result[doc.id] = doc.data;
      return result;
    },
    {}
  );

  const projects: ProjectsIndex = docs.reduce((result, doc) => {
    if (doc.type === "project") {
      const { data, uid } = doc;
      const techsUsed = data.technology_link?.map(
        (entry: any) => technologies[entry.technology.id]
      );
      result.push({
        ...data,
        uid,
        techsUsed,
      });
    }
    return result;
  }, []);

  if (Object.keys(projects).length) return { props: { preview, projects } };
  else return { props: { preview } };
};

export default IndexPage;
