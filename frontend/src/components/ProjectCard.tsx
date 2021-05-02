import { Avatar, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from '@material-ui/core';
import { ExpandMore, Delete, Edit } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
import clsx from 'clsx';



interface Props {
    id: number;
    title: string;
    description: string;
    avatar: string;
    duration: number;
    onDelete: (projectId: string) => void;
    onEdit: () => void;
    onProjectSelected: (id: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            cursor: 'pointer',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: theme.palette.primary.main,
        },
    }),
);


const ProjectCard = ({ id, title, description, avatar, duration, onDelete, onEdit, onProjectSelected }: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setExpanded(!expanded);
        e.stopPropagation();
    };

    const projectClickHandler = () => {
        onProjectSelected(id);
    }

    const deleteProjectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        onDelete(id.toString());
        e.stopPropagation();
    }

    const editProjectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        onEdit();
        e.stopPropagation();
    }

    return (
        <Card className={classes.root} onClick={projectClickHandler}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar} src={avatar} />
                }
                action={
                    <>
                        <IconButton onClick={editProjectHandler}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={deleteProjectHandler}>
                            <Delete />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                        >
                            <ExpandMore />
                        </IconButton>
                    </>
                }
                title={title}
                subheader={`Duration: ${duration} days`}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default ProjectCard
