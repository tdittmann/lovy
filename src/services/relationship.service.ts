import {environment} from "@/environment/environment";

export interface Relationship {
  code: string
  name1: string
  name2: string
  milestones: Milestone[]
  image: string
}

export interface Milestone {
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

const toRelationshipJson = (relationship: Relationship): RelationshipJson => {
  return {
    code: relationship.code,
    name1: relationship.name1,
    name2: relationship.name2,
    milestones: relationship.milestones.map(toMilestoneJson),
    image: relationship.image,
  };
};

const toMilestoneJson = (milestone: Milestone): MilestoneJson => {
  return {
    description: milestone.description,
    date: String(milestone.date.getTime())
  }
};

const cloneRelationship = (relationship: Relationship): Relationship => {
  return {
    code: relationship.code,
    name1: relationship.name1,
    name2: relationship.name2,
    milestones: relationship.milestones.map(cloneMilestone),
    image: relationship.image,
  };
};

const cloneMilestone = (milestone: Milestone): Milestone => {
  return {
    description: milestone.description,
    date: milestone.date,
  }
};

const loadRelationship = (code: string) => {
  return fetch(`${environment.backendUrl}?code=${code}`)
      .then(response => response.json())
      .then(value => {
        if (value) {
          return toRelationship(value)
        }
        return value;
      })
};

const updateRelationship = (relationship: Relationship) => {
  return fetch(environment.backendUrl, {
    method: "PUT",
    body: JSON.stringify(toRelationshipJson(relationship))
  })
      .then(response => response.json())
};

export const RelationshipService = {
  loadRelationship,
  updateRelationship,
  cloneRelationship
};