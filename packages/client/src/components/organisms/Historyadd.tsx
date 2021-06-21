import React from "react";
import { Route, useParams,useLocation} from "react-router-dom";
import useSWR from "swr";
import { Box } from "@material-ui/core";

import {
	route,
	GetResponse
} from "common/auth-client/api/v1/projects/_projectName/histories/_historyId";
import { jsonFetcher } from "utils/fetcher";
import HistoryHeader from "components/molecules/HistoryHeader";
import HistoryMain from "components/organisms/HistoryMain";
import SingleResultViewer from "components/organisms/result-view/SingleResultViewer";

const sx = { mt: 2 };

const Historyadd: React.FunctionComponent = () => {
	const lc = useLocation();
	const { project, historyId } = useParams<{
		project: string;
		historyId: string;
	}>();

	const reslist = lc.state;
	const datalist:  any[] = [];
	for(var j=0;j<reslist.length;j++){
	const { data } = useSWR(
		route(project, reslist[j].historyId),
		jsonFetcher<GetResponse>(),
		{
			refreshInterval: 1 * 60 * 1000 // 1 min
		}
	);
		if (!data || data.error) {
			throw data;
		}
	datalist.push(data)

	}


	const listcount = [] ;
	for(var i=0;i<reslist.length;i++){
		listcount.push(i)
	}

	const h = 0;
	return (
			<>
			{listcount.map((h) => (
			<Route exact path="/home/:project/historyadd/:historyId">
			
				<HistoryHeader
					status={datalist[h].status}
					detectorName={datalist[h].request.plugin.name}
					detectorVersion={datalist[h].request.args.detectorVersion}
					targetRevision={datalist[h].request.targets[0].revision || ""}
					targetDirectory={datalist[h].request.targets[0].directory}
					dispatched={datalist[h].dispatched}
					started={datalist[h].started}
					finished={datalist[h].finished}
				/>
				
				<Box mt={2}>
					<HistoryMain
						status={datalist[h].status}
						artifacts={datalist[h].artifacts}
						summaries={datalist[h].summaries.map(
							({ numberOfClonePairs }) => numberOfClonePairs
						)}
						queryString={JSON.stringify(
							datalist[h].request.args,
							undefined,
							4
						)}
					/>
				</Box>
				
			</Route>
			))}
			{listcount.map((h) => (
			<Route path="/home/:project/historyadd/:historyId/result/:resultId">
			
				<SingleResultViewer
					revision={datalist[h].request.targets[0].revision}
				/>
				
			</Route>
			))}
		</>
		

	);
};

export default Historyadd;




