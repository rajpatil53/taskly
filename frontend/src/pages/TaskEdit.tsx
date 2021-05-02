import { Box, Button, CircularProgress, Divider, TextField, Typography, Select, MenuItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react'
import { useLocation } from 'react-router'
import ProjectLogic from '../logic/ProjectLogic';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-query';

interface Props extends RouteComponentProps {

}

const TaskEdit = (props: Props) => {
    const { data } = useQuery('projects', ProjectLogic.getAllProjects);
    const { state: task } = useLocation<Task>();

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [startDate, setStartDate] = useState(task?.start_date || '')
    const [endDate, setEndDate] = useState(task?.end_date || '');
    const [project, setProject] = useState(task?.project);
    const [loading, setLoading] = useState(false);
    const [editError, setError] = useState('');

    const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const decsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    const startDateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    }
    const endDateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    }
    const projectChangeHandler = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        setProject(Number(event.target.value));
    }

    const onSave = async () => {
        if (!title.trim() || !description.trim() || !startDate || !endDate) {
            setError('Please fill all fields');
            return;
        }
        setLoading(true)
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("start_date", startDate.toString());
        formData.append("end_date", endDate.toString());
        formData.append("project", project.toString());
        try {
            if (task) {
                await ProjectLogic.editTask(task.project.toString(), task.id.toString(), formData);
            }
            else {
                await ProjectLogic.createTask(project.toString(), formData);
            }
            props.history.goBack();
        }
        catch (err) {
            setError('Some error occurred');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px" marginBottom="20px" >
                <Typography component="h1" variant="h3">Edit Project</Typography>
            </Box>
            <Divider />
            <Box display="flex" flexDirection="column" justifyContent="center" marginTop="20px" marginBottom="20px" >
                <TextField
                    variant="filled"
                    label="Title"
                    type="text"
                    value={title}
                    onChange={titleChangeHandler}
                />
                <TextField
                    variant="filled"
                    label="Description"
                    type="text"
                    value={description}
                    onChange={decsChangeHandler}
                />
                <TextField
                    variant="filled"
                    label="Start Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={startDate}
                    onChange={startDateChangeHandler}
                />
                <TextField
                    variant="filled"
                    label="End Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={endDate}
                    onChange={endDateChangeHandler}
                />
                <Select
                    label="Project"
                    variant="filled"
                    value={project}
                    name={'product'}
                    onChange={projectChangeHandler}
                >
                    {
                        data?.map(project => (
                            <MenuItem value={project.id as number}>{project.title}</MenuItem>
                        ))
                    }
                </Select>
                <Box marginTop="20px">
                    {
                        loading ? <CircularProgress /> : <Button variant="contained" fullWidth onClick={onSave}>Save</Button>
                    }
                </Box>
                {
                    editError ?
                        <Box marginTop="20px">
                            <Alert severity="error">{editError}</Alert>
                        </Box> :
                        null
                }
            </Box>

        </>
    )
}

export default TaskEdit
