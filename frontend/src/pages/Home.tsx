import React from 'react'
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import Alert from '@material-ui/lab/Alert';
import { RouteComponentProps } from 'react-router-dom';

import ProjectCard from '../components/ProjectCard';
import ProjectDetails from './ProjectDetails';
import ProjectLogic from '../logic/ProjectLogic';
import { Add } from '@material-ui/icons';

interface Props extends RouteComponentProps { }

const Home = (props: Props) => {
    const { isLoading, error, data, refetch } = useQuery('projects', ProjectLogic.getAllProjects);

    const onProjectSelected = (id: number) => {
        props.history.push('/projects/' + id);
    }

    const onAddProject = () => {
        props.history.push('/projects/edit');
    }

    const onEditProject = (project: Project) => {
        props.history.push('/projects/edit', project);
    }

    const onProjectDeleted = async (id: string) => {
        await ProjectLogic.deleteProject(id);
        refetch();
    }

    return (
        <>
            <Box display="flex" justifyContent="center" marginTop="20px">
                <Typography component="h1" variant="h3">Projects</Typography>
            </Box>
            <Box display="flex" justifyContent="center" marginTop="20px">
                {
                    isLoading && <CircularProgress />
                }
                {
                    error && <Alert severity="error">Error while fetching projects</Alert>
                }
                {
                    data && <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                        spacing={1}
                    >
                        <Button fullWidth={true} onClick={onAddProject}>
                            <Add />
                        </Button>
                        {
                            data.map(project => (
                                <Grid item key={project.id}>
                                    <ProjectCard
                                        id={project.id}
                                        title={project.title}
                                        description={project.description}
                                        avatar={project.avatar}
                                        duration={project.duration}
                                        onDelete={onProjectDeleted}
                                        onEdit={() => onEditProject(project)}
                                        onProjectSelected={onProjectSelected}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                }
            </Box>
        </>

    )
}

export default Home
