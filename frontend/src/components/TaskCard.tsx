import { Avatar, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from '@material-ui/core';
import { ExpandMore, Delete, Edit } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
import clsx from 'clsx';
import Common from '../logic/Common';


interface Props {
    id: number;
    projectId: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    onEdit: () => void;
    onDelete: (projectId: string, id: string) => void;
    onTaskSelected: (id: number) => void;
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


const TaskCard = ({ id, projectId, title, description, startDate, endDate, onEdit, onDelete, onTaskSelected }: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setExpanded(!expanded);
        e.stopPropagation();
    };

    const taskClickHandler = () => {
        onTaskSelected(id);
    }

    const deleteTaskHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        onDelete(projectId.toString(), id.toString());
        e.stopPropagation();
    }

    const editProjectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        onEdit();
        e.stopPropagation();
    }

    return (
        <Card className={classes.root} onClick={taskClickHandler}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <>
                        <IconButton onClick={editProjectHandler}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={deleteTaskHandler}>
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
                subheader={`${Common.getFormattedDate(startDate)} - ${Common.getFormattedDate(endDate)}`}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default TaskCard
