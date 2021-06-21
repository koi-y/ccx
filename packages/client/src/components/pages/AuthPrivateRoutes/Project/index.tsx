import React from "react";
import { useParams, Route } from "react-router-dom";

import HistoriesTable from "components/molecules/HistoriesTable";
import History from "components/organisms/History";
import Historyadd from "components/organisms/Historyadd";
import Diff from "components/organisms/Diff";
import { DetectionParametersConfig } from "components/pages/AuthPrivateRoutes/Project/DetectionParametersConfig";
import { DetectionParametersConfigadd } from "components/pages/AuthPrivateRoutes/Project/DetectionParametersConfigadd";
import { DetectionParametersConfigauto } from "components/pages/AuthPrivateRoutes/Project/DetectionParametersConfigauto";

const Projects: React.FunctionComponent = () => {
	const { project } = useParams<{ project: string }>();

	return (
		<>
			<Route exact path="/home/:project">
				<HistoriesTable project={project} />
			</Route>
			<Route exact path="/home/:project/clone-detection">
				<DetectionParametersConfig />
			</Route>
			<Route exact path="/home/:project/addclone-detection">
				<DetectionParametersConfigadd />
			</Route>	
			<Route exact path="/home/:project/auto-clone-detection">
				<DetectionParametersConfigauto />
			</Route>		
			<Route exact path="/home/:project/history">
				<HistoriesTable project={project} />
			</Route>
			<Route path="/home/:project/diff">
				<Diff project={project} />
			</Route>
			<Route path="/home/:project/history/:historyId">
				<History />
			</Route>
			<Route path="/home/:project/historyadd/:historyId">
				<Historyadd />
			</Route>
		</>
	);
};

export default Projects;
