export const cloneTemplate = (templateId: string):HTMLElement | null => {
    const TEMPLATE = document.querySelector<HTMLTemplateElement>(`template#${templateId}`) 

    if (!TEMPLATE) return null

    const clone = TEMPLATE.content.firstElementChild!.cloneNode(
      true
    ) as HTMLElement

    return clone
}