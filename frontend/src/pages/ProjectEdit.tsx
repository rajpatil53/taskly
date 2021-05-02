import { Box, Button, CircularProgress, Divider, Grid, Input, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react'
import { useLocation } from 'react-router'
import ProjectLogic from '../logic/ProjectLogic';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {

}

const ProjectEdit = (props: Props) => {
    const { state: project } = useLocation<Project>();

    const [title, setTitle] = useState(project?.title || '');
    const [description, setDescription] = useState(project?.description || '');
    const [duration, setDuration] = useState(project?.duration || 0);
    const [avatar, setAvatar] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const decsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    const durationChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(event.target.value));
    }
    const avatarChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setAvatar(event.target.files[0]);
    }

    const onSave = async () => {
        if (!title.trim() || !description.trim() || !duration || !avatar) {
            setError('Please fill all fields');
            return;
        }
        setLoading(true)
        const formData = new FormData();
        formData.append("avatar", avatar, avatar.name);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("duration", duration.toString());
        try {
            console.log(formData, avatar)
            if (project) {
                await ProjectLogic.editProject(project.id, formData);
            }
            else {
                await ProjectLogic.createProject(formData);
            }
            props.history.push('/');
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
                    label="Duration"
                    type="number"
                    value={duration}
                    onChange={durationChangeHandler}
                />
                <Input type="file" onChange={avatarChangeHandler} />
                <Box marginTop="20px">
                    {
                        loading ? <CircularProgress /> : <Button variant="contained" fullWidth onClick={onSave}>Save</Button>
                    }
                </Box>
                {
                    error ?
                        <Box marginTop="20px">
                            <Alert severity="error">{error}</Alert>
                        </Box> :
                        null
                }
            </Box>

        </>
    )
}

export default ProjectEdit
