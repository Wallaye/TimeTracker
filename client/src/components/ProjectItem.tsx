import React, {FC, useContext} from "react";
import {IProject} from "../models/IProject";
import {IActivity} from "../models/IActivity";
import {getSumTime, getTimeDiff} from "../utility/Utils";
import {Context} from "../index";

interface ProjectItemProps {
    project: IProject;
    onClick: (proj: IProject) => void
}

const ProjectItem: FC<ProjectItemProps> = ({project, onClick}) => {
    const {actStore} = useContext(Context);
    const help = () => {
        return getSumTime(actStore.activities.filter(el => el.project == project.projectId));
    }
    return (
        <tr className="table-hover" onClick={() => onClick(project)}>
            <td>{project.name}</td>
            <td>{project.activities.length}</td>
            <td>{help()}</td>
        </tr>
    );
}

export default ProjectItem;