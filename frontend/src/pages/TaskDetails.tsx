import React, { ReactElement } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom';
import { useQueries } from 'react-query';
import { Box, CircularProgress, Divider, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import SubtaskCard from '../components/SubtaskCard';
import ProjectLogic from '../logic/ProjectLogic';

interface Props extends RouteComponentProps {

}

type TaskDetailsParams = {
    projectId: string;
    taskId: string;
};

const TaskDetails = (props: Props) => {
    const { projectId, taskId } = useParams<TaskDetailsParams>();
    const [taskDetails, subtasks] = useQueries([
        {
            queryKey: [`task`, projectId, taskId],
            queryFn: () => ProjectLogic.getTask(projectId, taskId)
        },
        {
            queryKey: [`subtasks`, projectId, taskId],
            queryFn: () => ProjectLogic.getAllSubtasks(projectId, taskId)
        }
    ]);

    return (
        <Box display="flex" flexDirection="column" marginTop="20px" marginBottom="20px" >
            {
                (taskDetails.isLoading || subtasks.isLoading) && <CircularProgress />
            }
            {
                taskDetails.error && <Alert severity="error">Error while fetching task.</Alert>
            }
            {
                subtasks.error && <Alert severity="error">Error while fetching subtasks.</Alert>
            }
            {
                subtasks.data && taskDetails.data &&
                <>
                    <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px" marginBottom="20px" >
                        <Typography component="h1" variant="h3">{(taskDetails.data as Task).title}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" flexDirection="column" justifyContent="center" marginTop="20px" marginBottom="20px" >
                        <Typography component="p" variant="h6">Description:  {(taskDetails.data as Task).description}</Typography>
                        <Typography component="p" variant="h6">Subtasks:</Typography>
                        <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px" marginBottom="20px" >
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="stretch"
                                spacing={1}
                            >
                                {
                                    (subtasks.data as Subtask[]).map(subtask => (
                                        <Grid item key={subtask.id}>

                                            <SubtaskCard
                                                id={subtask.id}
                                                title={subtask.title}
                                                description={subtask.description}
                                                status={subtask.status}
                                                onDelete={() => { }}
                                                onTaskSelected={() => { }}
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    </Box>

                </>
            }
        </Box>
    )
}

export default TaskDetails
