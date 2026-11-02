# Recipe extraction

A recipe extraction turns source cooking content into recipes that a user can
keep. This glossary names intended domain concepts; it does not imply implementation.

## Language

**Source video**: Publicly accessible cooking-video content supplied for extraction.

**Extraction job**: One attempt to identify recipes from a source video and prepare
the resulting document for its requesting user.
_Avoid_: AI agent, when referring to the whole processing workflow.

**Recipe**: A set of ingredients and preparation instructions identified in source
content. A source video may contain no recipe or more than one.

**Recipe document**: A PDF containing the recipes produced by an extraction job.
_Avoid_: Recipe, when referring to the file rather than its contents.
