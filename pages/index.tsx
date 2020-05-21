import * as React from "react";
import { GetStaticProps } from "next";
import { Predicates } from "prismic-javascript";
import {
  AugmentedProjectData,
  FrontPageData,
  TechnologyData,
} from "../interfaces";
import { Client } from "../prismic-configuration";
import ProjectCard from "../components/ProjectCard";
import { usePreview } from "../components/PreviewContext";
import Hero from "../components/Hero";
import ContentContainer from "../components/ContentContainer";
import Title from "../components/Title";

type AugmentedProjects = AugmentedProjectData[];

interface Props {
  projects?: AugmentedProjects;
  preview?: boolean;
  technologies: TechnologyData[];
  techHeading: string;
}

const IndexPage: React.FunctionComponent<Props> = ({
  projects,
  preview,
  technologies,
  techHeading,
}) => {
  usePreview(preview);

  return (
    <>
      <style jsx>{`
        .project-card-container {
          animation-delay: 4.5s;
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(20rem, 100%), 1fr)
          );
          grid-auto-rows: 1fr;
          gap: 2rem;
        }
      `}</style>

      <Title title={"Portfolio"} />
      <Hero technologies={technologies} techHeading={techHeading} />
      <ContentContainer
        as="section"
        id="projects"
        style={{ marginTop: "3rem", animationDelay: "4s" }}
        className="fadein-full"
      >
        <h2>Projects</h2>
        <div className="project-card-container fadein-full">
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

/**
 * Fetch the list of projects and their data so that they can be displayed on the index page.
 */
export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  const ref = previewData?.ref;
  const queryOptions = { ref };
  const client = Client();

  // Fetch all projects and technology docs
  const docs: any[] =
    (
      await client.query(
        [Predicates.any("document.type", ["project", "technology"])],
        queryOptions
      )
    )?.results ?? [];

  // All technology docs fetched once instead of fetching each doc every time it is used
  const allTechs: { [id: string]: TechnologyData } = docs.reduce(
    (result, doc) => {
      if (doc.type === "technology") result[doc.id] = doc.data;
      return result;
    },
    {}
  );

  // Augment project data with full technology docs
  const projects: AugmentedProjects = docs.reduce((result, doc) => {
    if (doc.type === "project") {
      const { data, uid } = doc;
      const techsUsed = data.technology_link?.map(
        (entry: any) => allTechs[entry.technology.id]
      );
      result.push({
        ...data,
        uid,
        techsUsed,
      });
    }
    return result;
  }, []);

  // Fetch front page data
  const frontPageData = (await client.getSingle("frontpage", queryOptions))
    ?.data as FrontPageData;
  const frontPageTechs: TechnologyData[] =
    frontPageData?.technology_link?.map(
      (entry) => allTechs[entry.technology.id]
    ) ?? [];
  const techHeading = frontPageData.technology_heading;

  // Sort projects into display order
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

  return {
    props: { preview, projects, technologies: frontPageTechs, techHeading },
  };
};

export default IndexPage;
