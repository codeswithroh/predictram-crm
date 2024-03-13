import { Helmet } from 'react-helmet-async';

import { GePUEcoAnalyzerView } from 'src/sections/gePUEcoalanlyzer/view';

// ----------------------------------------------------------------------

export default function GePUEcoAnalyzerPage() {
  return (
    <>
      <Helmet>
        <title> Predictram-GePU EcoAnalyzer </title>
      </Helmet>

      <GePUEcoAnalyzerView />
    </>
  );
}