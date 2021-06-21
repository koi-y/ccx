import React from "react";
import { useHistory, useParams,useLocation} from "react-router-dom";
import useSWR from "swr";
import runDetector from "apis/detection/dispatchDetection";
import { route, GetResponse } from "common/auth-client/api/v1/detectors";
import {
	route as route2,
	GetResponse as GetResponse2
} from "common/auth-client/api/v1/projects/_projectName/histories/_historyId";
import { jsonFetcher } from "utils/fetcher";
import disableRevalidate from "utils/disableRevalidate";
import { validateRepositoryPath } from "utils/validateRepositoryPath";
import { DetectionConfigForm } from "components/organisms/DetectionConfigForm";
import useSnackbar from "hooks/useSnackbar";
import { Config } from "reducers/detectionFormReducer";

export const DetectionParametersConfigadd: React.FunctionComponent = () => {
	const { project } = useParams<{ project: string }>();
	const history = useHistory();
	const { openSnackbar } = useSnackbar();
	const lc = useLocation();
	const onRunButtonClicked = React.useCallback(
		async (
			config: Config,
			moredetectflag: boolean,
			event: React.MouseEvent<HTMLButtonElement>
		): Promise<void> => {
			event.preventDefault();
			const [owner, id] = config.formValues.pluginId.split(":");
			const res = await runDetector(project, {
				plugin: {
					id,
					owner
				},
				args: {
					detectorVersion: config.formValues.detectorVersion,
					parameters: config.formValues.parameters
				}
			});

			if (res.error) {
				openSnackbar("error", res.error.message);
			} 
			else if(moredetectflag){

/*
				const { data2 } = useSWR(
					route2(project, id),
					jsonFetcher<GetResponse2>(),
					{
						refreshInterval: 1 * 60 * 1000 // 1 min
					}
				);
				const reslist =lc.state;
				reslist.push(data2);

*/

				const reslist =lc.state;
				reslist.push(res);

				history.push({ pathname: `/home/${project}/addclone-detection`, state: reslist});
			}
			else {
				/*
				const { data2 } = useSWR(
					route2(project, id),
					jsonFetcher<GetResponse2>(),
					{
						refreshInterval: 1 * 60 * 1000 // 1 min
					}
				);
				const reslist =lc.state;
				reslist.push(data2);
				*/
				const reslist =lc.state;
				reslist.push(res);

				history.push({ pathname: `/home/${project}/historyadd/${res.historyId}`, state: reslist});
			}
			


		},
		[project]
	);

	
	const { data } = useSWR(
		route(),
		jsonFetcher<GetResponse>(),
		disableRevalidate
	);

	if (!data || data.error) {
		throw data;
	}

	return (
		<DetectionConfigForm
			plugins={data}
			validateRepositoryPath={validateRepositoryPath}
			onRunButtonClicked={onRunButtonClicked}
		/>
	);
};


