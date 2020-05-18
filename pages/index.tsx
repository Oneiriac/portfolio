import * as React from "react";
import { GetStaticProps } from "next";
import { Predicates } from "prismic-javascript";
import { AugmentedProjectData, TechnologyData } from "../interfaces";
import { Client, loadHeader } from "../prismic-configuration";
import ProjectCard from "../components/ProjectCard";
import { usePreview } from "../components/PreviewContext";
import Hero from "../components/Hero";
import ContentContainer from "../components/ContentContainer";
import Title from "../components/Title";

type ProjectsIndex = AugmentedProjectData[];

interface Props {
  projects?: ProjectsIndex;
  preview?: boolean;
  technologies: TechnologyData[];
}

const IndexPage: React.FunctionComponent<Props> = ({
  projects,
  preview,
  technologies,
}) => {
  usePreview(preview);

  return (
    <>
      <style jsx>{`
        .project-card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
          grid-auto-rows: 1fr;
          gap: 2rem;
        }
      `}</style>

      <Title title={"Portfolio"} />
      <Hero technologies={technologies} />
      <ContentContainer as="section" id="projects">
        <h2>Projects</h2>
        <div className="project-card-container">
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project.uid}
                projectData={project}
                uid={project.uid}
                techsUsed={project.techsUsed}
              />
            ))}
        </div>
      </ContentContainer>
    </>
  );
};

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

  projects.sort((projA, projB) => {
    // Primary criterion is ongoing status
    if (projA.ongoing && !projB.ongoing) return -1;
    if (!projA.ongoing && projB.ongoing) return 1;
    // Both are ongoing, use start_date as secondary criterion
    if (projA.start_date > projB.start_date) return -1;
    if (projA.start_date < projB.start_date) return 1;
    // Both ongoing and both started on same date
    return 0;
  });

  await loadHeader(ref);

  if (Object.keys(projects).length)
    return {
      props: { preview, projects, technologies: Object.values(technologies) },
    };
  else return { props: { preview } };
};

export default IndexPage;
