import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SessionNotes = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');

  const sessionNotes = [
    {
      id: 1,
      studentName: "Sarah Chen",
      studentId: "SC2024",
      sessionDate: "2025-01-11",
      sessionType: "Individual Therapy",
      duration: "50 min",
      content: `Session focused on anxiety management techniques. Sarah reported significant improvement in sleep patterns since implementing the breathing exercises discussed in our last session.\n\nKey Discussion Points:\n- Sleep hygiene improvements (7-8 hours consistently)\n- Reduced caffeine intake showing positive effects\n- Academic stress management strategies\n- Social anxiety in group settings\n\nInterventions Used:\n- Cognitive Behavioral Therapy techniques\n- Progressive muscle relaxation\n- Mindfulness exercises\n\nHomework Assigned:\n- Continue daily breathing exercises\n- Practice grounding techniques before social situations\n- Complete anxiety tracking worksheet\n\nNext Session Goals:\n- Review anxiety tracking results\n- Explore social anxiety triggers\n- Introduce exposure therapy concepts`,
      riskLevel: "low",
      mood: "improving",
      nextSession: "2025-01-18",
      tags: ["anxiety", "sleep", "CBT", "homework"]
    },
    {
      id: 2,
      studentName: "Marcus Johnson",
      studentId: "MJ2023",
      sessionDate: "2025-01-10",
      sessionType: "Crisis Support",
      duration: "75 min",
      content: `Emergency session due to severe panic attack episode. Marcus experienced his third panic attack this week, triggered by upcoming midterm examinations.\n\nCrisis Assessment:\n- No immediate self-harm risk\n- Strong support system (family contacted with permission)\n- Panic attacks lasting 10-15 minutes\n- Physical symptoms: rapid heartbeat, sweating, dizziness\n\nImmediate Interventions:\n- Grounding techniques (5-4-3-2-1 method)\n- Breathing exercises to manage hyperventilation\n- Safety planning discussion\n- Medication consultation referral\n\nSafety Plan Established:\n- Emergency contacts updated\n- Coping strategies card provided\n- 24/7 crisis hotline information\n- Follow-up appointment scheduled within 48 hours\n\nAction Items:\n- Psychiatrist referral for medication evaluation\n- Academic accommodations discussion\n- Family therapy session consideration`,
      riskLevel: "high",
      mood: "crisis",
      nextSession: "2025-01-12",
      tags: ["crisis", "panic-attacks", "safety-plan", "referral"]
    },
    {
      id: 3,
      studentName: "Emma Rodriguez",
      studentId: "ER2024",
      sessionDate: "2025-01-09",
      sessionType: "Group Therapy",
      duration: "90 min",
      content: `Group session focused on social anxiety and peer support. Emma showed increased participation and willingness to share experiences with the group.\n\nGroup Dynamics:\n- 6 participants present\n- Emma volunteered to share first time\n- Positive peer feedback received\n- Demonstrated active listening skills\n\nEmma's Contributions:\n- Shared experience with social anxiety in academic settings\n- Offered support to newer group member\n- Practiced assertiveness exercises\n- Engaged in role-playing scenarios\n\nProgress Noted:\n- Increased eye contact during discussions\n- Spoke without prompting (significant improvement)\n- Showed empathy and support for peers\n- Less fidgeting and nervous behaviors\n\nGroup Homework:\n- Practice one assertiveness technique daily\n- Journal about social interactions\n- Prepare to lead next week's check-in\n\nIndividual Follow-up:\n- Schedule individual session to process group experience\n- Continue social skills practice`,
      riskLevel: "medium",
      mood: "stable",
      nextSession: "2025-01-16",
      tags: ["group-therapy", "social-anxiety", "progress", "assertiveness"]
    }
  ];

  const filteredNotes = sessionNotes?.filter(note =>
    note?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    note?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    note?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
  );

  // Auto-save simulation
  useEffect(() => {
    if (isEditing && noteContent !== selectedNote?.content) {
      setAutoSaveStatus('saving');
      const timer = setTimeout(() => {
        setAutoSaveStatus('saved');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [noteContent, isEditing, selectedNote]);

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setNoteContent(note?.content);
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    setAutoSaveStatus('saved');
    setIsEditing(false);
    // In real app, save to backend
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'crisis': return 'text-error';
      case 'improving': return 'text-success';
      case 'stable': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="FileText" className="text-primary" size={24} />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Session Notes
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {autoSaveStatus === 'saving' && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Loader2" className="animate-spin" size={16} />
              <span>Saving...</span>
            </div>
          )}
          {autoSaveStatus === 'saved' && isEditing && (
            <div className="flex items-center space-x-2 text-sm text-success">
              <Icon name="Check" size={16} />
              <span>Auto-saved</span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            New Note
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search notes by student name, content, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes List */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Recent Notes</h3>
          {filteredNotes?.map((note) => (
            <div
              key={note?.id}
              className={`p-4 rounded-lg border gentle-transition cursor-pointer ${
                selectedNote?.id === note?.id
                  ? 'bg-primary/5 border-primary/20' :'bg-background/50 border-border hover:bg-background/80'
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground">
                    {note?.studentName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {note?.sessionType} • {note?.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(note.sessionDate)?.toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(note?.riskLevel)}`}>
                      {note?.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {note?.content?.substring(0, 120)}...
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {note?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {note?.tags?.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{note?.tags?.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon 
                    name="TrendingUp" 
                    className={getMoodColor(note?.mood)} 
                    size={16} 
                  />
                  <span className={`text-xs ${getMoodColor(note?.mood)}`}>
                    {note?.mood}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note Editor */}
        <div className="space-y-4">
          {selectedNote ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">
                  {isEditing ? 'Edit Note' : 'Note Details'}
                </h3>
                <div className="flex items-center space-x-2">
                  {!isEditing ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      iconName="Edit"
                      iconPosition="left"
                      onClick={() => handleEditNote(selectedNote)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsEditing(false);
                          setNoteContent(selectedNote?.content);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        iconName="Save"
                        iconPosition="left"
                        onClick={handleSaveNote}
                      >
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {selectedNote?.studentName} ({selectedNote?.studentId})
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedNote?.sessionType} • {new Date(selectedNote.sessionDate)?.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(selectedNote?.riskLevel)}`}>
                      {selectedNote?.riskLevel} risk
                    </span>
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e?.target?.value)}
                    className="w-full h-96 p-3 border border-border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter session notes..."
                  />
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                      {selectedNote?.content}
                    </pre>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex flex-wrap gap-1">
                      {selectedNote?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      Next session: {new Date(selectedNote.nextSession)?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Icon name="FileText" className="text-muted-foreground mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Select a note to view
              </h3>
              <p className="text-muted-foreground">
                Choose a session note from the list to view or edit details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionNotes;