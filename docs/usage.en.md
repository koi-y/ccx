# Detect code clones #
## Importing a repository ##
CCX can detect code clones from public Git repositories.

To register your repository with CCX, enter the URL of your repository in the [https://sel.ist.osaka-u.ac.jp/webapps/ccx/new] form and import it. Depending on the repository, the import may take several minutes.

Private Git repositories are not supported.

After the import is complete, you will be redirected to the project top page.

## Setting the detection tools and parameters ##
Go to the top page of the project and click the button at the top left of the screen to display the menu. Select "Clone Detection" from the menu to set the detection tools and parameters to be used.
After completing the settings, press the RUN DETECTOR button to start the code clone detection.

Press the ADD DETECTOR button to save the settings and open the next setting window. Pressing the RUN DETECTOR button at the end repeats the above procedure to execute the saved settings sequentially.

The upper left corner of the screen shows the current execution status (Pending, Running, Succeeded, Failed), but since it is not automatically updated, please reload the screen to check the current status.

## Simultaneous execution function ##
Selecting "Clone Detection (All Detectors)" in the menu will run all the registered detection tools with default parameters except for the language selection.
This is useful to see the results of different detection tools for now.

## History management ##
Select History in the menu to see the history of the previous runs; clicking on the History ID will take you to a screen where you can see the details of the run results. Clicking on the History ID will take you to a screen where you can see the details of the execution results. Pressing VIEW RESULT on this screen will bring up the following
The following code clone analysis screen will appear.

## Analyze code clones ##
Select History from the menu to display a list of detection history. 
Select History from the menu to display a list of detection history. Select the desired one, and then select the SUMMARY tab on the screen after navigating to it, and the VIEW RESULT button will appear. Click this button to move to the analysis screen. (If there are no code clones, Number of Clone Pairs:0 will be displayed and VIEW RESULT cannot be pressed.　Selecting the ARTIFACTS tab will allow you to download the analysis results in JSON format.

Selecting a file from the upper left pane will display a list of clone pairs contained in that file in the lower left pane. When you select a clone pair, its code fragments will be displayed in the center and right panes.

# When in trouble #
Go to the menu and press History to bring up the history. This screen is the basic one.
If this does not work, click on CCX and re-enter from the project selection screen.
If it stacks, try hitting Back in your browser, reloading, and clicking CCX.
