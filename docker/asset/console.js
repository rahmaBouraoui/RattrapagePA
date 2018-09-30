'use strict';

// asset

module.exports = {

	questions: [
		{
			message: "Output directory. Relative to the current directory.",
			name: "output_directory",
			default: 'public',
		},
	],

    events: {

        update: {
            after: () => {
            	let assetsDir = Skyflow.getCurrentAssetDir();
                Skyflow.Output.success(assetsDir + " directory created!");
            },
        },

    }


};
