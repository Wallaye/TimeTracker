import React, {FC, useContext, useEffect} from "react";
import {observable} from "mobx";
import {Context} from "../index";
import NavBar from "../components/NavBar";
import {useNavigate} from "react-router-dom";
import ProjectItem from "../components/ProjectItem";
import {observer} from "mobx-react-lite";

const ProjectsPage: FC = () => {
    const {projStore, userStore, actStore} = useContext(Context);
    const navigate = useNavigate();

     useEffect(() => {
            actStore.getActivities();
            projStore.getProjects();
        }, [actStore, projStore])

    if (projStore.isLoading) {
        return <div className="align-self-center spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
    }

    if (projStore.projects.length == 0) {
        return <>
            <NavBar userName={userStore.user.userName}></NavBar>
            <div className="container-fluid mt-3 d-grid justify-content-center">
                <div className="row">
                    <span className="h1 align-self-center">Нет проектов!</span>
                </div>
                <div className="row w-auto">
                    <button className="btn btn-success mb-3" onClick={() => navigate('/api/projects/-1')}>Добавить
                        проект
                    </button>
                </div>
            </div>
        </>
    }

    return (
        <>
            <NavBar userName={userStore.user.userName}></NavBar>
            <div>
                <div className="container-fluid mt-3 d-flex justify-content-center">
                    <div className="row w-auto">
                        <button className="btn btn-warning mb-3" onClick={() => navigate('/api/projects/-1')}>Добавить
                            проект
                        </button>
                    </div>
                </div>
            </div>
            <table className="table table-hover table-bordered mt2">
                <thead className="thead-light">
                <tr>
                    <th>Имя</th>
                    <th>Количество активностей</th>
                    <th>Суммарное время</th>
                </tr>
                </thead>
                <tbody>
                {projStore.projects.map(el =>
                    <ProjectItem project={el} key={el.projectId}
                        onClick ={(el) => navigate('/api/projects/' + el.projectId)}></ProjectItem>
                )}
                </tbody>
            </table>
        </>
    )

};

export default observer(ProjectsPage);