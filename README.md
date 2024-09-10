# Casey Fischer Prominent Edge Take-Home Project

welcome to my (hopefully) helpful and convenient readme!

i ended up with a very limited but functional solution. the main areas that
i would have liked to improve are brittleness (e.g. it will not work with files
that are formatted any differently from the sample data) and security (API keys
are visible to the client). i also would have liked to add a "download" button
so that users can persist the enriched data as a .json file, in the format it
was originally provided. this would have been a quick add but i ran out of time.

i chose to implement this project as a completely client side application. users
will choose a file to enrich right from the map view, and a marker will appear
on the map showing the location of the incident. click the marker to toggle the
incident details view, which is simply displayed as a JSON blob with no styling.

i also would have liked to spend more time on making it look prettier--but alas!

## Setup

after cloning the repo, run `npm install` from inside the directory.

you will need API keys for google maps and meteostat (these are both available for
free).

create a `.env` file containing these API keys:

```js
VITE_GOOGLE_MAPS_API_KEY="your google maps api key here!!"
VITE_METEOSTAT_API_KEY="your meteostat api key here!!"
```

then `npm run dev` to start the development server.

## Usage

visit `http://localhost:5173` in your web browser of choice. you should see a google
maps view showing beautiful richmond, VA. click the "Select File" button and choose 
an input file. the enriched data will appear in the window. you can click the map
marker to toggle this window, and scroll within the data shown inside it.

## Thanks!

thanks for the opportunity to apply at Prominent Edge. i enjoyed working on this
project and hope you like what i came up with!

~casey
