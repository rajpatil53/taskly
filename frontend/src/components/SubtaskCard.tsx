import { Avatar, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from '@material-ui/core';
import { ExpandMore, Delete, Edit } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';
import clsx from 'clsx';

interface Props {
    id: number;
    title: string;
    description: string;
    status: string;
    onDelete: () => void;
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


const SubtaskCard = ({ id, title, description, status, onDelete, onTaskSelected }: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setExpanded(!expanded);
        e.stopPropagation();
    };

    const taskClickHandler = () => {
        onTaskSelected(id);
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
                        <IconButton onClick={taskClickHandler}>
                            <Edit />
                        </IconButton>
                        <IconButton >
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
                subheader={`Status: ${status}`}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default SubtaskCard
