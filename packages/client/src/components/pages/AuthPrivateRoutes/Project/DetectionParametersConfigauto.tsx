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
import { reducer,
		getInitialState,
		Config,
	createConfigByPluginIdAndVersion
	} from "reducers/detectionFormReducer";
import PureParameterField from "components/organisms/detection-form/ParametersSection";
import {
	DetectPluginEntity,
	DetectPluginsEntity,
	PrefixedPluginId
} from "contexts/DetectPluginContext";
import ProgressButton from "components/atoms/ProgressButton";
import { Divider, makeStyles,FormControl, Select, MenuItem } from "@material-ui/core";
import {
	DetectPluginContext,
	createInitialDetectPluginContext
} from "contexts/DetectPluginContext";
import { Box, Grid,	ListItemIcon,
	ListItemText, } from "@material-ui/core";
import { NumberParameterField } from "components/molecules/detection-form/NumberParameterField";
import { VariantParameterField } from "components/molecules/detection-form/VariantParameterField";


import { VariantParameter } from "common/all/types/parameters";
import { result } from "common/all/types/Result";

export const DetectionParametersConfigauto: React.FunctionComponent = () => {
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


			var serchitem:any;
			for(const item of resultarray){
				if(item.value == config.formValues.parameters.l){
					serchitem=item;
					break;
				}
			}

			const sercharray :any[] = [];
			detectorsInfo.ids.forEach(async (element: any) => {
				const detectorsInfoparameters=detectorsInfo['plugins'][element]['variants'][0]['parameters'];
				Object.keys(detectorsInfoparameters).map(function(h){
					if(detectorsInfoparameters[h]['type']=="input"){

					}
					if(detectorsInfoparameters[h]['label']=="Language"){
						detectorsInfoparameters[h]['rule']['values'].map(function(h2: any){							
							if(h2.label==serchitem.label){
								const pushtemp={
									label: h2.label,
									value: h2.value,
									Id: element
								};
								sercharray.push(pushtemp);
							}
						});
					}
				}
				);
			});






					const reslist: any[] =[];
					for(const element of sercharray){

						const defconfig = createConfigByPluginIdAndVersion(element.Id,detectorsInfo['plugins'][element.Id]['versions'][0],detectorsInfo['plugins'][element.Id]['variants'][0],validateRepositoryPath);

						var langkey:any;
						for(const key of Object.keys(detectorsInfo['plugins'][element.Id]['variants'][0]['parameters'])){
							if(detectorsInfo['plugins'][element.Id]['variants'][0]['parameters'][key].label == "Language"){
								langkey=key;
								break;
							}

						}
						defconfig["formValues"]["parameters"][langkey]=element.value;
						if(element.Id == "global:ccx-plugin-detect-ccfsw"){
							defconfig["formValues"]["parameters"]["o"]= "a";
						}
						const [owner, id] = element.Id.split(":");
						const res = await runDetector(project, {
							plugin: {
								id,
								owner
							},
							args: {
								detectorVersion:detectorsInfo['plugins'][element.Id]['versions'][0],
								parameters: defconfig.formValues.parameters
							}
						});
						if (res.error) {
							openSnackbar("error", res.error.message);
						} 
			
						reslist.push(res);
				}
			history.push({ pathname: `/home/${project}/historyadd/${reslist[0].historyId}`, state: reslist});



		},
		[project]
	);
	


	const { ids, plugins } = React.useContext(DetectPluginContext);



	
	const { data } = useSWR(
		route(),
		jsonFetcher<GetResponse>(),
		disableRevalidate
	);

	if (!data || data.error) {
		throw data;
	}

	const detectorsInfo = React.useMemo(
		() => createInitialDetectPluginContext(data),
		[data]
	);

	const initializedReducer = React.useMemo(
		() => reducer(detectorsInfo, validateRepositoryPath),
		[detectorsInfo, validateRepositoryPath]
	);

	const [config, dispatch] = React.useReducer(
		initializedReducer,
		{ entity: detectorsInfo, validateRepositoryPath },
		getInitialState
	);

	const pKey="l";
	const def = config.variant.parameters[pKey];
	const value = config.formValues.parameters[pKey];
	const value2 =value;
	const error = config.formState.errors[pKey];

	//const detectorsInfoparameters=detectorsInfo['plugins']['global:ccx-plugin-detect-ccfsw']['variants'][0]['parameters'];
	var resultarray: any[]=[];
	//const resulttoolarray: any[]=[];
	detectorsInfo.ids.forEach(async (element: any) => {
		const detectorsInfoparameters=detectorsInfo['plugins'][element]['variants'][0]['parameters'];
		Object.keys(detectorsInfoparameters).map(function(h){
			if(detectorsInfoparameters[h]['label']=="Language"){
				detectorsInfoparameters[h]['rule']['values'].map(function(h2: any){
					if(resultarray.indexOf(h2)==-1){
						resultarray.push(h2);

					}
					
				});

			}

		}
		);
	});

	const itemlabel = resultarray.map(function(item) {
		return item.label;
	  });


	
	  resultarray = resultarray.filter(function(item, index) {
		return itemlabel.indexOf(item.label) === index;
	  });





	
	type VariantItem = {
		label: string | number;
		value: string | number;
	};

	const normalizeElement = (
		e: VariantParameter["rule"]["values"][number]
	): VariantItem => {
		if (typeof e === "object" && "value" in e && "label" in e) {
			return e;
		}
	
		return {
			label: e,
			value: e
		};
	};


	const normalizeValues = (
		values: VariantParameter["rule"]["values"]
	): VariantItem[] => values.map(normalizeElement);

	const handleChange = React.useCallback(
		(next: unknown) => {
			dispatch({
				type: "set-parameter",
				payload: {
					key: pKey,
					value: next
				}
			});
		},
		[pKey, dispatch]
	);
	const onChange: React.ChangeEventHandler<{
		name?: string | undefined;
		value: unknown;
	}> = React.useCallback(
		(event: { target: { value: any; }; }) => {
			handleChange(event.target.value);
		},
		[handleChange]
	);

	/*
	detectorsInfo.ids.forEach(async (element: any) => {
		const langarray = detectorsInfo['plugins'][element]['variants'][0]['parameters']['l']['rule']['values'];

	});
	*/

	const onClick = React.useCallback(
		async (
			event: React.MouseEvent<HTMLButtonElement>
		): Promise<void> => {
			await onRunButtonClicked(config,false,event);
		},
		[config, onRunButtonClicked]
	);

	const children = <FormControl fullWidth >
	<Select displayEmpty value={value ?? ""} onChange={onChange}>
		{resultarray.map((e: { value: any; label: any; }) => (
			<MenuItem key={e.value ?? ""} value={e.value ?? ""}>
				{e.label}
			</MenuItem>
		))}
	</Select>
</FormControl>

	return (
		<>	<>
		<ListItemIcon />
		<ListItemText
			disableTypography
			primary={def.label ?? pKey}
			secondary={children}
		/>
	</>

			<Grid
				container
				component={undefined as any}
				spacing={2}
				justify="flex-end"
			>
				<Grid item>
					<ProgressButton
						type="submit"
						disabled={false}
						variant="contained"
						onClick={onClick}
					>
						Run detector
					</ProgressButton>
				</Grid>
			</Grid></>
	);
};


