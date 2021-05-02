import React, { ReactElement } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom';
import { useQueries } from 'react-query';
import { Box, Button, CircularProgress, Divider, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import TaskCard from '../components/TaskCard';
import ProjectLogic from '../logic/ProjectLogic';
import { Add } from '@material-ui/icons';

interface Props extends RouteComponentProps {

}

type ProjectDetailsParams = {
    id: string;
};


function ProjectDetails(props: Props): ReactElement {
    const { id } = useParams<ProjectDetailsParams>();
    const [projectDetails, tasks] = useQueries([
        {
            queryKey: [`project`, id],
            queryFn: () => ProjectLogic.getProject(id)
        },
        {
            queryKey: [`tasks`, id],
            queryFn: () => ProjectLogic.getAllTasks(id)
        }
    ]);

    const onTaskSelected = (taskId: number) => {
        props.history.push(`/projects/${id}/tasks/${taskId}/`);
    }

    const onTaskDeleted = async (projectId: string, taskId: string) => {
        await ProjectLogic.deleteTask(projectId, taskId);
        tasks.refetch();
    }

    const onAddTask = () => {
        props.history.push(`/projects/${id}/tasks/edit/`);
    }

    const onEditTask = (task: Task) => {
        props.history.push(`/projects/${id}/tasks/edit/`, task);
    }

    return (
        <>
            {
                (projectDetails.isLoading || tasks.isLoading) && <CircularProgress />
            }
            {
                projectDetails.error && <Alert severity="error">Error while fetching project.</Alert>
            }
            {
                tasks.error && <Alert severity="error">Error while fetching tasks.</Alert>
            }
            {
                tasks.data && projectDetails.data &&
                <>
                    <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px" marginBottom="20px" >
                        <Typography component="h1" variant="h3">{(projectDetails.data as Project).title}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" flexDirection="column" justifyContent="center" marginTop="20px" marginBottom="20px" >
                        <Typography component="p" variant="h6">Duration: {(projectDetails.data as Project).duration}</Typography>
                        <Typography component="p" variant="h6">Description:  {(projectDetails.data as Project).description}</Typography>
                        <Typography component="p" variant="h6">Tasks:</Typography>
                        <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px" marginBottom="20px" >
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="stretch"
                                spacing={2}
                            >
                                <Button fullWidth={true} onClick={onAddTask}>
                                    <Add />
                                </Button>
                                {
                                    (tasks.data as Task[]).map(task => (
                                        <Grid item key={task.id}>

                                            <TaskCard
                                                id={task.id}
                                                projectId={task.project}
                                                title={task.title}
                                                description={task.description}
                                                startDate={new Date(task.start_date)}
                                                endDate={new Date(task.end_date)}
                                                onDelete={onTaskDeleted}
                                                onEdit={() => onEditTask(task)}
                                                onTaskSelected={onTaskSelected}
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    </Box>

                </>
            }
        </>
    )
}

export default ProjectDetails
