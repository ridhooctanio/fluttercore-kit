import { wrapWith } from "../utilities";

const collectSnippet = (widget: string) => {
    return `Collect(() {
        return ${widget};
    })`;
};

export const wrapWithCollect = async () => wrapWith(collectSnippet);
