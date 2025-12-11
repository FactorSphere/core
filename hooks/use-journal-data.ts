"use client"

import { useState, useEffect } from "react"

export interface Journal {
  "OA_Journal Name": string
  "OA_ISSN-L": string
  OA_Publisher?: string
  "OA_Works Count"?: number
  "OA_Cited By Count"?: number
  OA_Homepage?: string
  OA_Discipline?: string
  "OA_Journal Name_clean"?: string
  SCIMAGO_Rank?: number
  SCIMAGO_Sourceid?: number
  SCIMAGO_Title?: string
  SCIMAGO_Type?: string
  SCIMAGO_Issn?: string
  SCIMAGO_SJR?: number
  "SCIMAGO_SJR Best Quartile"?: string
  "SCIMAGO_H index"?: number
  "SCIMAGO_Total Docs. (2024)"?: number
  "SCIMAGO_Total Docs. (3years)"?: number
  "SCIMAGO_Total Refs."?: number
  "SCIMAGO_Total Citations (3years)"?: number
  "SCIMAGO_Citable Docs. (3years)"?: number
  "SCIMAGO_Citations / Doc. (2years)"?: number
  "SCIMAGO_Ref. / Doc."?: number
  SCIMAGO_Overton?: number
  SCIMAGO_SDG?: number
  SCIMAGO_Country?: string
  SCIMAGO_Region?: string
  SCIMAGO_Publisher?: string
  SCIMAGO_Coverage?: string
  SCIMAGO_Categories?: string
  SCIMAGO_Areas?: string
  SCIMAGO_Title_clean?: string
  Match_Score?: number
  OOIR_IF?: number
}

interface Dictionary {
  [key: string]: { full: string; short: string }
}

function parseCSVDictionary(csvText: string): Dictionary {
  const lines = csvText.trim().split("\n")
  const dictionary: Dictionary = {}

  // Skip header row (FieldName,FullMeaning,ShortMeaning)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    // Handle CSV with potential commas in quoted fields
    const match = line.match(/^([^,]+),"([^"]*)","([^"]*)"$/)
    if (match) {
      const [, fieldName, fullMeaning, shortMeaning] = match
      dictionary[fieldName] = { full: fullMeaning, short: shortMeaning }
    } else {
      // Fallback for simple CSV without quotes
      const parts = line.split(",")
      if (parts.length >= 3) {
        dictionary[parts[0]] = { full: parts[1], short: parts[2] }
      }
    }
  }

  return dictionary
}

export function useJournalData() {
  const [journals, setJournals] = useState<Journal[]>([])
  const [dictionary, setDictionary] = useState<Dictionary>({})
  const [fields, setFields] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)

        const [journalsRes, dictionaryRes] = await Promise.all([
          fetch("/factorsphere_data.json"),
          fetch("/dictionary.csv"),
        ])

        if (!journalsRes.ok) {
          throw new Error(`Failed to load journal data: ${journalsRes.status}`)
        }

        const journalsData: Journal[] = await journalsRes.json()
        setJournals(journalsData)

        if (dictionaryRes.ok) {
          const csvText = await dictionaryRes.text()
          const parsedDictionary = parseCSVDictionary(csvText)
          setDictionary(parsedDictionary)
        } else {
          // Default dictionary if file not found
          setDictionary({
            "OA_ISSN-L": { full: "International Standard Serial Number", short: "ISSN" },
            "OA_Journal Name": { full: "Journal Name", short: "Name" },
            OOIR_IF: { full: "Impact Factor", short: "IF" },
            "OA_Cited By Count": { full: "Total Citations", short: "Citations" },
            "SCIMAGO_H index": { full: "H-Index", short: "H-Index" },
            SCIMAGO_Categories: { full: "Subject Categories", short: "Categories" },
            SCIMAGO_Coverage: { full: "Coverage Period", short: "Coverage" },
          })
        }

        // Extract unique fields from journals (using SCIMAGO_Areas for broader categories)
        const fieldSet = new Set<string>()
        journalsData.forEach((journal) => {
          if (journal.SCIMAGO_Areas) {
            journal.SCIMAGO_Areas.split(";").forEach((area) => {
              fieldSet.add(area.trim())
            })
          }
          if (journal.SCIMAGO_Categories) {
            journal.SCIMAGO_Categories.split(";").forEach((cat) => {
              // Extract category name without quartile info (e.g., "Oncology (Q1)" -> "Oncology")
              const catName = cat.trim().replace(/\s*$$Q\d$$$/, "")
              fieldSet.add(catName)
            })
          }
        })
        setFields(Array.from(fieldSet).sort())

        setError(null)
      } catch (err) {
        console.error("Error loading journal data:", err)
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { journals, dictionary, fields, isLoading, error }
}

export function useJournalById(id: string) {
  const { journals, dictionary, isLoading, error } = useJournalData()
  const journal = journals.find((j) => j["OA_ISSN-L"] === id)
  return { journal, dictionary, isLoading, error }
}
