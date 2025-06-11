export type Relationship = {
  code: string
  name1: string
  name2: string
  milestones: Milestone[]
  image: string
}

export type Milestone = {
  date: Date
  description: string
}

export interface RelationshipJson {
  code: string
  name1: string
  name2: string
  milestones: MilestoneJson[]
  image: string
}

export interface MilestoneJson {
  date: string
  description: string
}

const toRelationship = (relationship: RelationshipJson): Relationship => {
  return {
    code: relationship.code,
    name1: relationship.name1,
    name2: relationship.name2,
    milestones: relationship.milestones.map(toMilestone),
    image: relationship.image,
  };
};

const toMilestone = (milestone: MilestoneJson): Milestone => {
  return {
    description: milestone.description,
    date: new Date(parseInt(milestone.date, 10))
  }
};

const loadRelationship = (code: string) => {
  return fetch(`http://api.lovy.timo-dittmann.de?code=${code}`)
      .then(response => response.json())
      .then(value => {
        if (value) {
          return toRelationship(value)
        }
        return value;
      })
};

export const RelationshipService = {
  loadRelationship,
};