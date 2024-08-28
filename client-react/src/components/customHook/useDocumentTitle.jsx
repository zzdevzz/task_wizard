import React from "react";

export const useDocumentTitle = (title) => {
  React.useEffect(() => {
    document.title = `TaskWizard - ${title}`
  }, [title])
}